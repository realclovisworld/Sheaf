# 𝐒 Sheaf — Project Structure (Post-Migration)

## Architecture: Client-Side PDF Processing

**Status**: ✅ **Fully Migrated to pdf-lib (Browser-Based)**

This is a **frontend-only application** with no backend or serverless functions.

---

## Directory Tree

```
PDF_Merger/
│
├── 📄 Configuration
│   ├── vercel.json              (Vercel deployment config — static site)
│   ├── .gitignore               (Git exclusions)
│   ├── .vercelignore            (Vercel exclusions)
│   └── README.md                (Main documentation)
│
├── 🎨 Frontend (React + pdf-lib)
│   └── frontend/
│       ├── public/
│       │   ├── index.html
│       │   └── logo.jpeg        (Sheaf app logo)
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── FileUploader.jsx/css     (Drag-drop interface)
│       │   │   ├── FileList.jsx/css         (File list display)
│       │   │   ├── MergeButton.jsx/css      (Action button)
│       │   │   └── UploadProgressBar.jsx/css (Size tracker)
│       │   │
│       │   ├── utils/
│       │   │   └── merge.js                 (pdf-lib integration)
│       │   │
│       │   ├── App.jsx                      (Main orchestrator)
│       │   ├── App.css                      (Layout + branding header)
│       │   ├── index.css                    (Global + design tokens)
│       │   └── index.js                     (React entry point)
│       │
│       ├── build/                           (Production build — git ignored)
│       ├── package.json                     (Dependencies + scripts)
│       ├── package-lock.json               (Lock file)
│       └── .gitignore
│
├── 🐍 Python (Deleted)
│   ├── ❌ api/                 (REMOVED)
│   └── ❌ requirements.txt      (REMOVED)
│
└── 📚 Local Reference Docs (Git Ignored)
    ├── DEPLOYMENT.md           (Vercel setup guide)
    ├── DESIGN.md               (Design system)
    ├── ORGANIZATION.md         (File structure reference)
    └── QUICKSTART.md           (Local dev guide)
```

---

## Key Files & Their Roles

### Core Application

| File | Lines | Purpose |
|------|-------|---------|
| `frontend/src/App.jsx` | 120 | Main React component orchestrating state and merge flow |
| `frontend/src/App.css` | 230 | Layout, branding header, messaging |
| `frontend/src/index.css` | 90 | Global styles, design tokens (colors, spacing, easing) |
| `frontend/src/index.js` | 7 | React entry point |

### Components

| File | Lines | Purpose |
|------|-------|---------|
| `FileUploader.jsx/css` | 100/180 | Drag-drop interface, file validation |
| `FileList.jsx/css` | 40/170 | Display uploaded files with numbering, sizes, remove buttons |
| `MergeButton.jsx/css` | 30/85 | Action button with loading state |
| `UploadProgressBar.jsx/css` | 35/85 | Size meter showing 20MB limit |

### Utilities

| File | Lines | Purpose |
|------|-------|---------|
| `utils/merge.js` | 75 | **pdf-lib integration** — client-side PDF merging |

### Configuration

| File | Purpose |
|------|---------|
| `frontend/package.json` | Dependencies (React 18, pdf-lib 1.17) + scripts |
| `vercel.json` | Static site deployment config (no serverless) |
| `.gitignore` | Ignores venv/, node_modules/, build/, docs |

---

## Data Flow

```
1. USER UPLOADS FILES
   ↓
   FileUploader.jsx
   ├─ Validates file type (PDF only)
   ├─ Validates quantity (2-10 files)
   └─ Validates individual size (≤10MB)
   ↓
2. FILES ADDED TO STATE
   ↓
   App.jsx (files state)
   ├─ FileList.jsx (displays files with numbers, sizes)
   ├─ UploadProgressBar.jsx (shows total size vs 20MB limit)
   └─ MergeButton.jsx (enabled if ≥2 files and ≤20MB total)
   ↓
3. USER CLICKS "BIND YOUR PAGES"
   ↓
   App.jsx → mergePDFs() from utils/merge.js
   ├─ Validates constraints (2-10 files, ≤20MB total)
   ├─ Loads each PDF with pdf-lib
   ├─ Copies all pages into merged document
   ├─ Exports merged PDF as blob
   └─ Returns { blob, name: 'sheaf.pdf', pages: count }
   ↓
4. BROWSER DOWNLOADS FILE
   ↓
   App.jsx → createObjectURL(blob) → trigger download
   ├─ Creates download link
   ├─ Simulates click
   ├─ Cleans up URL
   └─ Shows success message
   ↓
5. USER SUCCESS STATE
   ├─ "Your sheaf is ready" message appears
   ├─ Files cleared from state
   └─ Success message auto-hides after 2s
```

---

## Technology Stack (Post-Migration)

### Frontend
- **React 18.2** — UI framework with hooks
- **pdf-lib 1.17** — **Client-side PDF processing** (NEW)
- **CSS** — Apple HIG design system, no Tailwind

### Build & Deployment
- **Create React App** — Webpack + Babel build pipeline
- **Vercel** — Static site hosting (Hobby plan compatible)
- **No serverless functions** — Eliminates 2048MB memory error

### Design System
- **Colors** — Apple palette (#0071e3 blue, warm grays)
- **Typography** — System font stack (-apple-system)
- **Animation** — CSS transitions with Apple easing curves
- **Spacing** — 8pt grid (--space-1 through --space-8)

---

## Constraints & Limits

| Constraint | Value | Notes |
|-----------|-------|-------|
| **Min files** | 2 | Enforced in merge.js |
| **Max files** | 10 | Enforced in merge.js |
| **Max file size** | 10 MB | Individual file limit |
| **Max total size** | 20 MB | Browser memory constraint |
| **File type** | PDF only | Validated before merge |
| **Processing time** | 1-5s | Depends on file size |
| **Environment** | Browser | No server required |

---

## Dependencies

### Runtime (frontend/package.json)
```
"react": "^18.2.0"           — UI framework
"react-dom": "^18.2.0"       — DOM rendering
"pdf-lib": "^1.17.1"         — ✨ PDF processing
"react-scripts": "5.0.1"     — CRA build tools
```

### Development (Built into CRA)
- Webpack, Babel, ESLint (inherited from react-scripts)

---

## Build & Deployment

### Local Development
```bash
cd frontend
npm start                # Starts dev server on http://localhost:3000
```

### Production Build
```bash
npm run build            # Creates optimized bundle in build/
```

### Vercel Deployment
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**No serverless functions. No backend. Pure frontend.**

---

## Security & Privacy

- ✅ **No server storage** — Files processed and deleted immediately
- ✅ **Browser-only processing** — All PDF work happens client-side
- ✅ **No network requests** — No data leaves your machine
- ✅ **Works offline** — After initial page load
- ✅ **No tracking** — No analytics or logging

---

## What Removed

| Item | Why | Impact |
|------|-----|--------|
| `api/` folder | No backend needed | ✅ Eliminated 2048MB error |
| `requirements.txt` | No Python deps | ✅ Simpler setup |
| FastAPI | Not needed | ✅ Faster startup |
| Mangum | Serverless adapter | ✅ No infrastructure |
| Old `vercel.json` | Backend routes | ✅ Simpler config |

---

## What's New

| Item | What It Does | Benefit |
|------|-------------|---------|
| `merge.js` | Client-side PDF merge | ✅ No memory limits |
| `pdf-lib` | Browser PDF library | ✅ Works offline |
| New `vercel.json` | Static site config | ✅ Instant deploys |

---

## Error Handling

All validation happens **client-side** in `merge.js`:

```javascript
throw new Error('At least 2 PDFs are required.');
throw new Error('Maximum 10 PDFs per merge.');
throw new Error('Only PDF files are supported.');
throw new Error('This sheaf would be too heavy.');
throw new Error('One or more PDF files are corrupted or invalid.');
```

Errors are caught in App.jsx and displayed as user-friendly messages in sheaf metaphor.

---

## Performance

| Metric | Value |
|--------|-------|
| **Build size** | ~55 kB (gzipped) |
| **Merge speed** | 1-3s (depends on file count/size) |
| **Browser compatibility** | Chrome, Firefox, Safari, Edge (modern versions) |
| **Memory usage** | Scales with file size (20MB max safe) |

---

## File Status Checklist

- ✅ `App.jsx` — Uses client-side merge, no API calls
- ✅ `merge.js` — pdf-lib integration complete
- ✅ `FileUploader.jsx` — Validates PDFs, max 20MB message
- ✅ `UploadProgressBar.jsx` — Shows 20MB limit
- ✅ `MergeButton.jsx` — Works with local merge function
- ✅ `FileList.jsx` — Displays files correctly
- ✅ `package.json` — pdf-lib added, proxy removed
- ✅ `vercel.json` — Static deployment config
- ✅ `index.css` — Design tokens all present
- ✅ `index.js` — Entry point unchanged
- ✅ Build succeeds with no errors

---

**Status**: ✅ **Ready for Production**

*Last verified: April 2, 2026*
