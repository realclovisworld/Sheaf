# 𝐒 Sheaf — PDF Merger

> **Bring your pages together.** A beautiful, Apple-inspired web application for merging multiple PDF files into a single document.

---

## 📸 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. GATHER YOUR PAGES                                       │
│     ┌─────────────────────────────────────────────────────┐ │
│     │                                                     │ │
│     │  📄   Drop PDFs here                               │ │
│     │       or click to browse                           │ │
│     │       [Select files]                               │ │
│     │                                                     │ │
│     │  Upload pdf files and bind a maximum of 50MB       │ │
│     └─────────────────────────────────────────────────────┘ │
│                          ⬇️                                  │
│  2. REVIEW YOUR SELECTION                                    │
│     ┌──────────────────────────────────────────────────┐    │
│     │ [1] 📄 document1.pdf      2.5 MB      ✓          │    │
│     │ [2] 📄 document2.pdf      1.8 MB      ✓          │    │
│     │ [3] 📄 document3.pdf      3.2 MB      ✓          │    │
│     └──────────────────────────────────────────────────┘    │
│                                                             │
│     📊 Progress: 7.50 / 50.00 MB                            │
│                          ⬇️                                  │
│  3. BIND YOUR PAGES                                         │
│     ┌──────────────────────────┐                           │
│     │  [Bind your pages]       │  ← Click to merge       │
│     └──────────────────────────┘                           │
│                          ⬇️                                  │
│  4. YOUR SHEAF IS READY                                     │
│     📥 sheaf.pdf downloaded                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **🎯 Drag-and-Drop Interface** — Gather PDFs intuitively with a frosted glass design
- **📋 Real-Time Validation** — See file count, size tracking (max 50MB total)
- **📊 Progress Indicator** — Visual size meter shows exactly how much capacity is used
- **⚡ Fast Merging** — Powered by pikepdf for rapid, reliable PDF processing
- **🍎 Apple-Inspired Design** — Clean, minimal interface with smooth animations
- **🌍 Responsive Layout** — Works beautifully on desktop, tablet, and mobile
- **☁️ Serverless Deployment** — Runs on Vercel with zero infrastructure to manage

---

## 🛠️ Technical Stack

### Backend (Python)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | FastAPI | Modern, fast web framework |
| **PDF Processing** | pikepdf | Robust, efficient PDF merging |
| **Serverless Adapter** | Mangum | Vercel compatibility |
| **Server** | Uvicorn (local) | ASGI development server |

### Frontend (React)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18 | Component-based UI |
| **Styling** | CSS Custom Properties | Design tokens system |
| **Build Tool** | Create React App | Webpack + Babel setup |
| **Design System** | Apple HIG | Human Interface Guidelines |

### Deployment
| Platform | Configuration | Status |
|----------|---------------|--------|
| **Vercel** | Serverless Functions | Production deployment |
| **GitHub** | Git repository | Source control |

---

## 🚀 Quick Start

### Prerequisites
- **Python** 3.9+
- **Node.js** 14+ (with npm)
- **Git**

### 1️⃣ Setup (One-time)

```bash
# Clone and navigate
cd ~/Documents/PDF_Merger

# Activate Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2️⃣ Run Development Servers

**Terminal 1 — Backend API:**
```bash
source venv/bin/activate
python -m uvicorn api.merge:app --reload
```
Backend: **http://127.0.0.1:8000**

**Terminal 2 — Frontend App:**
```bash
cd frontend
npm start
```
Frontend: **http://localhost:3000**

### 3️⃣ Test the App

1. Open **http://localhost:3000**
2. Drag 2-3 PDF files into the upload box
3. Click **"Bind your pages"**
4. Download your merged PDF!

---

## 📁 Project Structure

```
PDF_Merger/
│
├── 📄 Documentation
│   ├── README.md              ← You are here
│   ├── DESIGN.md             ← Apple design system
│   ├── QUICKSTART.md         ← Local dev guide
│   ├── DEPLOYMENT.md         ← Vercel setup
│   └── ORGANIZATION.md       ← File structure reference
│
├── ⚙️ Configuration
│   ├── vercel.json           ← Vercel build config
│   ├── requirements.txt       ← Python packages
│   ├── .gitignore           ← Git exclusions
│   └── .vercelignore        ← Vercel exclusions
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
│       ├── src/
│       │   ├── components/
│       │   │   ├── FileUploader.jsx/css   (Drag-drop interface)
│       │   │   ├── FileList.jsx/css       (File display)
│       │   │   ├── MergeButton.jsx/css    (Action button)
│       │   │   └── UploadProgressBar.jsx/css (Size tracker)
│       │   ├── App.jsx/css               (Main orchestrator)
│       │   ├── index.css                 (Global + design tokens)
│       │   └── index.js                  (React entry point)
│       │
│       └── package.json
│
└── 📚 Virtual Environment
    └── venv/                ← Python packages (git-ignored)
```

### What's Tracked in Git
- ✅ Source code (backend + frontend)
- ✅ Configuration files
- ✅ Documentation
- ✅ Logo and static assets

### What's Ignored
- ❌ `venv/` — Python virtual environment
- ❌ `frontend/node_modules/` — npm packages
- ❌ `frontend/build/` — Production build
- ❌ `.env`, `.DS_Store`, cache files

---

## 🔌 API Reference

### POST `/api/merge`
Merge multiple PDF files into a single document.

**Request:**
```bash
curl -X POST http://localhost:8000/api/merge \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "files=@document3.pdf" \
  -o sheaf.pdf
```

**Response:** Binary PDF file (application/pdf)

**Constraints:**
- **Minimum files:** 2
- **Maximum files:** 10
- **Max file size:** 10 MB each
- **Max total size:** 50 MB
- **File type:** PDF only
- **Timeout:** 30 seconds

**Error Messages:**
| Error | Cause | Fix |
|-------|-------|-----|
| `Select at least two PDFs.` | Only 1 file uploaded | Add more PDFs |
| `This sheaf would be too heavy.` | Total > 50MB | Remove or reduce files |
| `Only PDF files are supported.` | Non-PDF file selected | Select PDF files only |
| `Binding failed.` | Server error | Check file format |

### GET `/health`
Health check endpoint.

**Response:**
```json
{ "status": "ok" }
```

---

## 📦 Deployment to Vercel

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
5. Click **"Deploy"** and wait 2-3 minutes

### Step 3: Test Production
Visit your live URL: `https://your-project.vercel.app`

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
