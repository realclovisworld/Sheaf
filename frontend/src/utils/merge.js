import { PDFDocument } from 'pdf-lib';

/**
 * Merge multiple PDF files into a single document
 * @param {File[]} files - Array of PDF File objects
 * @returns {Promise<{blob: Blob, name: string, pages: number}>} - Merged PDF and metadata
 * @throws {Error} If PDF processing fails
 */
export async function mergePDFs(files) {
  if (!files || files.length < 2) {
    throw new Error('At least 2 PDFs are required.');
  }

  if (files.length > 10) {
    throw new Error('Maximum 10 PDFs per merge.');
  }

  // Validate file types and sizes
  let totalSize = 0;
  for (const file of files) {
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are supported.');
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('This sheaf would be too heavy.');
    }
    totalSize += file.size;
  }

  if (totalSize > 20 * 1024 * 1024) {
    throw new Error('This sheaf would be too heavy.');
  }

  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    let totalPages = 0;

    // Process each PDF file
    for (const file of files) {
      const fileBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);
      const pageCount = pdfDoc.getPageCount();
      totalPages += pageCount;

      // Copy all pages from source PDF
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );

      // Add copied pages to merged PDF
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    // Save merged PDF to bytes
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    return {
      blob,
      name: 'sheaf.pdf',
      pages: totalPages,
    };
  } catch (error) {
    // Handle specific pdf-lib errors
    if (error.message.includes('Invalid PDF')) {
      throw new Error('One or more PDF files are corrupted or invalid.');
    }
    throw new Error(error.message || 'Binding failed.');
  }
}

/**
 * Get metadata from a PDF file without loading the entire document
 * @param {File} file - PDF File object
 * @returns {Promise<{pages: number, size: string}>} - PDF metadata
 */
export async function getPDFMetadata(file) {
  try {
    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();
    const size = (file.size / 1024 / 1024).toFixed(2);

    return {
      pages: pageCount,
      size,
    };
  } catch (error) {
    throw new Error('Invalid PDF file.');
  }
}
