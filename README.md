# 𝐒 Sheaf — PDF Merger

> **Bring your pages together.** A beautiful, Apple-inspired web application for merging multiple PDF files into a single document. No backend. No limits. All processing happens in your browser.

---

## 📸 How It Works — Step by Step

| Step | Action | What Happens |
|------|--------|--------------|
| **1️⃣ Open App** | Visit [sheaf.vercel.app](https://sheaf.vercel.app) | See Sheaf logo, title, and upload interface |
| **2️⃣ Gather Files** | Drag & drop 2-10 PDF files into the box OR click "Select files" | Files are validated (PDF only, ≤10MB each) |
| **3️⃣ See Your Selection** | Files appear in a numbered list with checkmarks | Shows file names, sizes, and total progress bar (0-20MB) |
| **4️⃣ Review Total Size** | Look at progress bar below the file list | Bar turns red if you exceed 20MB limit |
| **5️⃣ Click "Bind Your Pages"** | Button activates when you have 2+ files under 20MB total | App starts merging (takes 1-5 seconds) |
| **6️⃣ Wait for Processing** | See "Binding..." status in the upload area | pdf-lib merges PDFs in your browser (client-side) |
| **7️⃣ Download Result** | Browser automatically downloads `sheaf.pdf` | File contains all pages from your PDFs in order |
| **8️⃣ See Success Message** | "Your sheaf is ready" appears for 2 seconds | List clears, ready for next merge |

---

### Visual Data Flow

```
You Select Files
      ⬇️
┌─────────────────────────────┐
│  Frontend Validation        │  ← Checks file type, size, quantity
│  • PDF only?                │
│  • ≤10MB per file?          │
│  • 2-10 files total?        │
└─────────────────────────────┘
      ⬇️
Files Displayed in List
┌─────────────────────────────┐
│ [1] ✓ document1.pdf  2.5MB  │
│ [2] ✓ document2.pdf  1.8MB  │
│ [3] ✓ document3.pdf  3.2MB  │
│                             │
│ Progress: 7.50 / 20.00 MB   │
└─────────────────────────────┘
      ⬇️
You Click "Bind Your Pages"
      ⬇️
┌─────────────────────────────┐
│  pdf-lib Processing         │  ← Runs in your browser
│  • Load each PDF            │
│  • Copy all pages           │
│  • Combine into 1 PDF       │
│  • Create download blob     │
└─────────────────────────────┘
      ⬇️
Browser Downloads sheaf.pdf
      ⬇️
✅ Success! "Your sheaf is ready"
```

---

## ✨ Features

- **🎯 Drag-and-Drop Interface** — Gather PDFs intuitively with a frosted glass design
- **📋 Real-Time Validation** — See file count, size tracking (max 20MB total)
- **📊 Progress Indicator** — Visual size meter shows exactly how much capacity is used
- **⚡ Fast Merging** — Powered by pdf-lib, runs entirely in your browser
- **🍎 Apple-Inspired Design** — Clean, minimal interface with smooth animations
- **🌍 Responsive Layout** — Works beautifully on desktop, tablet, and mobile
- **🔒 Privacy First** — No server, no files stored, all processing client-side
- **⚡ Instant Deploys** — Static site on Vercel, no backend infrastructure

---

## 🛠️ Technical Stack

### Frontend (React + pdf-lib)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18.2 | Component-based UI |
| **PDF Processing** | pdf-lib 1.17.1 | **Client-side PDF merging** |
| **Styling** | CSS Custom Properties | Design tokens system |
| **Build Tool** | Create React App | Webpack + Babel setup |
| **Design System** | Apple HIG | Human Interface Guidelines |

### Deployment
| Platform | Configuration | Status |
|----------|---------------|--------|
| **Vercel** | Static Site (No Serverless) | Production deployment |
| **GitHub** | Git repository | Source control |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+ (with npm)
- **Git** (optional, for cloning)

### 1️⃣ Setup (One-time)

```bash
# Clone and navigate
cd ~/Documents/PDF_Merger

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2️⃣ Run the App

**Start the development server:**
```bash
cd frontend
npm start
```
App opens automatically at: **http://localhost:3000**

### 3️⃣ Test the App

1. Open **http://localhost:3000**
2. Drag 2-3 PDF files into the upload box
3. See files appear with numbering and checkmarks
4. Watch the progress bar as you add more files
5. Click **"Bind your pages"**
6. Download your merged `sheaf.pdf`!

---

## 📁 Project Structure

```
PDF_Merger/
│
├── 📄 Main Documentation
│   ├── README.md              ← You are here
│   └── STRUCTURE.md           ← Technical architecture
│
├── ⚙️ Configuration
│   ├── vercel.json            ← Vercel deployment config
│   ├── .gitignore             ← Git exclusions
│   └── .vercelignore          ← Vercel exclusions
│
├── 🔧 Backend (Python)
│   └── api/
│       ├── __init__.py
│       └── merge.py          ← FastAPI endpoint
│
├── 🎨 Frontend (React)
│   └── frontend/
│       ├── public/
│       │   ├── index.html
│       │   └── logo.jpeg     ← App logo
│       │
│       │   ├── components/
│       │   │   ├── FileUploader.jsx/css       (Drag-drop interface)
│       │   │   ├── FileList.jsx/css           (File display with numbering)
│       │   │   ├── MergeButton.jsx/css        (Action button)
│       │   │   └── UploadProgressBar.jsx/css  (Size tracker)
│       │   │
│       │   ├── utils/
│       │   │   └── merge.js                   (pdf-lib integration)
│       │   │
│       │   ├── App.jsx/css                    (Main orchestrator)
│       │   ├── index.css                      (Global + design tokens)
│       │   └── index.js                       (React entry point)
│       │
│       └── package.json
│
└── 📚 Ignored (Not in Git)
    ├── frontend/node_modules/          ← npm packages
    ├── frontend/build/                 ← Production build
    └── venv/                           ← Python packages (if exists)
```

### What's Tracked in Git
- ✅ Source code (React components + utilities)
- ✅ Configuration files (vercel.json)
- ✅ Documentation (README.md, STRUCTURE.md)
- ✅ Design assets (logo.jpeg)

### What's Ignored
- ❌ `frontend/node_modules/` — npm packages
- ❌ `frontend/build/` — Production build
- ❌ `venv/` — Python packages (legacy)
- ❌ `.env`, `.DS_Store`, cache files

---

## ⚙️ How It Actually Works (Technical)

**No backend. All processing happens in your browser.**

1. **File Upload** → Browser validates files (type, size, quantity)
2. **User Review** → Lists files, shows total size, enables button
3. **Click Merge** → Calls `mergePDFs()` utility function
4. **pdf-lib Processing** → 
   - Loads each PDF into memory
   - Copies all pages into a new document
   - Exports as binary blob
5. **Browser Download** → Triggers native download of `sheaf.pdf`
6. **Success** → Shows confirmation, clears files

**Why this is better:**
- ✅ No 2048MB memory limit (Vercel Hobby plan issue eliminated)
- ✅ Works offline (after initial load)
- ✅ Instant (no network round trips)
- ✅ Private (files never leave your device)

---

## 🔌 API Reference

**No API endpoints.** All merging happens client-side with pdf-lib.

To use Sheaf programmatically, import the merge function:

```javascript
import { mergePDFs } from './src/utils/merge';

const files = [file1, file2, file3]; // Array of File objects
const result = await mergePDFs(files);
// result = { blob, name: 'sheaf.pdf', pages: totalPageCount }

// Download the blob
const url = window.URL.createObjectURL(result.blob);
const link = document.createElement('a');
link.href = url;
link.download = result.name;
link.click();
```

**Constraints:**
- **Minimum files:** 2
- **Maximum files:** 10
- **Max file size:** 10 MB each
- **Max total size:** 20 MB (browser memory)
- **File type:** PDF only
- **Processing:** 1-5 seconds per merge

**Error Messages (All Client-Side):**
| Error | Cause | Fix |
|-------|-------|-----|
| `Gather at least two pages.` | Only 1 file uploaded | Add more PDFs |
| `This sheaf would be too heavy.` | Total > 20MB | Remove or reduce files |
| `Only PDF files are supported.` | Non-PDF file selected | Select PDF files only |
| `Maximum 10 PDFs per merge.` | More than 10 files | Upload fewer files |
| `One or more PDF files are corrupted.` | Invalid PDF | Check file format |

---

## 📦 Deployment to Vercel (Hobby Plan Compatible)

**Key advantage:** Static site deployment. No serverless functions. No memory limits.

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy Sheaf PDF merger"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to **https://vercel.com**
2. Click **"Import Project"**
3. Select your GitHub repository
4. Vercel auto-detects `vercel.json`
5. Click **"Deploy"** (instant build, no serverless compilation)

### Step 3: Test Production
Visit your live URL: `https://your-project.vercel.app`

**Why this works on Hobby plan:**
- ✅ Static HTML/CSS/JS only (no backend)
- ✅ No Python runtime needed
- ✅ No 2048MB memory limit
- ✅ Instant cold starts
- ✅ Works offline after first load

---

## 🎨 Design Philosophy

Sheaf is built on **Apple's Human Interface Guidelines**:

- **Confident Simplicity** — Every element has a purpose
- **Invisible Interface** — The app disappears; only the task remains
- **Fluid Motion** — Spring physics, not abrupt transitions
- **Semantic Color** — Blue for actions, green for success, red for errors
- **Negative Space** — Breathing room creates clarity

### Design Tokens (CSS Variables)

**Colors:**
```css
--color-accent: #0071e3          /* Apple blue */
--color-bg-primary: #f5f5f7      /* Warm gray */
--color-surface: rgba(255,255,255,0.72) /* Frosted glass */
--color-text-primary: #1d1d1f    /* Headings */
--color-text-secondary: #86868b  /* Body text */
--color-success: #34c759         /* Success green */
```

**Spacing (8pt grid):**
```css
--space-1: 8px    --space-3: 24px   --space-6: 48px
--space-2: 16px   --space-4: 32px   --space-8: 64px
```

**Animation (Apple easing curves):**
```css
--ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1)
--ease-entrance: cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
```

See `DESIGN.md` for the complete design system.

---

## ⚡ Performance

| Metric | Value | Notes |
|--------|-------|-------|
| **Build Size** | 50.05 kB | Gzipped, optimized |
| **Merge Speed** | 1-5s | Typical PDF operation |
| **Upload Limit** | 50 MB | Vercel serverless constraint |
| **Timeout** | 30s | Serverless function limit |
| **Memory** | In-process only | No persistent storage |

---

## 🐛 Troubleshooting

### "Port 8000/3000 already in use"
```bash
# Kill process on port 8000
lsof -ti :8000 | xargs kill -9

# Kill process on port 3000
lsof -ti :3000 | xargs kill -9
```

### "Module not found" (Python)
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### "Module not found" (npm)
```bash
cd frontend
npm install --force
cd ..
```

### Build fails with "npm not found"
Ensure you're in the correct directory:
```bash
cd ~/Documents/PDF_Merger
source venv/bin/activate
cd frontend && npm start
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Overview, features, quick start (you are here) |
| **QUICKSTART.md** | Local development — how to run both servers |
| **DEPLOYMENT.md** | Vercel deployment — detailed setup steps |
| **DESIGN.md** | Design system — colors, typography, components |
| **ORGANIZATION.md** | File structure — what goes where |

---

## 🔐 Security & Privacy

- ✅ **Stateless Processing** — Files never stored on disk
- ✅ **In-Memory Only** — PDFs processed and discarded immediately
- ✅ **No Logging** — No file contents or metadata logged
- ✅ **HTTPS in Production** — Vercel auto-enables SSL
- ✅ **No Tracking** — No analytics or third-party services

---

## 📄 License

MIT License — Use freely, modify, and distribute.

---

## 👨‍💼 Built By

**Clovis Atiki**  
[𝕏 @realclovisworld](https://x.com/realclovisworld) · [Instagram](https://www.instagram.com/realclovisworld/?hl=en) · [GitHub](https://github.com/realclovisworld)

---

**Status:** ✅ **Ready for Production**  
*Last Updated: April 2, 2026*
