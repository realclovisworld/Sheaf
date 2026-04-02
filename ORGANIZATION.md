# Project Organization & File Structure

**Status**: ✅ **Fully Organized and Ready**

## Directory Tree

```
PDF_Merger/
│
├── 📄 Documentation (Root Level)
│   ├── README.md                    (176 lines) - Project overview & setup
│   ├── DESIGN.md                    (350 lines) - Apple design system spec
│   ├── QUICKSTART.md                (120 lines) - Local dev guide
│   ├── DEPLOYMENT.md                (120 lines) - Vercel deployment
│   └── ORGANIZATION.md              (This file) - File structure reference
│
├── ⚙️ Configuration Files (Root Level)
│   ├── vercel.json                  - Vercel build & routes config
│   ├── requirements.txt              - Python dependencies (FastAPI, pikepdf, Mangum)
│   ├── .gitignore                   - Git exclusions (venv/, node_modules/, etc.)
│   └── .vercelignore                - Vercel deployment exclusions
│
├── 🔧 Backend (Python)
│   └── api/
│       ├── __init__.py              - Package initialization
│       └── merge.py                 - FastAPI app (104 lines)
│                                      • /api/merge POST endpoint
│                                      • PDF validation & merging
│                                      • Error handling
│                                      • Mangum serverless adapter
│
├── 🎨 Frontend (React)
│   └── frontend/
│       ├── public/
│       │   └── index.html           - HTML entry point
│       │
│       ├── src/
│       │   ├── components/          - React components
│       │   │   ├── FileUploader.jsx - Drag-drop interface
│       │   │   ├── FileUploader.css - Frosted glass dropzone
│       │   │   ├── FileList.jsx     - File display
│       │   │   ├── FileList.css     - Files app styling
│       │   │   ├── MergeButton.jsx  - Action button
│       │   │   └── MergeButton.css  - Pill button styling
│       │   │
│       │   ├── App.jsx              - Main component (state, orchestration)
│       │   ├── App.css              - Layout & container styles
│       │   ├── index.css            - Global styles + design tokens
│       │   └── index.js             - React entry point
│       │
│       ├── package.json             - Node.js dependencies & scripts
│       └── package-lock.json        - Dependency lock file
│
├── 📚 Virtual Environments (Ignored)
│   └── venv/                        - Python virtual environment
│                                      (.gitignore excluded)
│
└── 🔒 Git & Version Control
    ├── .git/                        - Git repository
    └── Git history (8 commits):
        1. Initial setup & structure
        2. Backend implementation
        3. Frontend components
        4. Craft aesthetic redesign
        5. Apple design language
        6. Enhanced .gitignore
        7. Comprehensive setup ready
```

## File Organization Standards

### ✅ What's Tracked in Git
```
api/
├── __init__.py
└── merge.py

frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FileList.jsx/css
│   │   ├── FileUploader.jsx/css
│   │   └── MergeButton.jsx/css
│   ├── App.jsx/css
│   ├── index.css
│   └── index.js
├── package.json
└── package-lock.json

Configuration & Docs
├── .gitignore
├── .vercelignore
├── vercel.json
├── requirements.txt
├── README.md
├── DESIGN.md
├── QUICKSTART.md
├── DEPLOYMENT.md
└── ORGANIZATION.md
```

### ❌ What's Ignored (Not Tracked)
```
venv/                          - Python virtual environment
frontend/node_modules/         - Node packages (1000s of files)
frontend/build/                - Production build output
.env                           - Environment variables
.env.local                      - Local env overrides
.DS_Store                      - macOS metadata
.vscode/                       - VSCode settings
.idea/                         - IntelliJ IDE settings
__pycache__/                   - Python cache files
*.pyc                          - Compiled Python files
.vercel/                       - Vercel CLI cache
npm-debug.log                  - NPM debug logs
```

## File Size Summary

| Component | Size | Notes |
|-----------|------|-------|
| api/ | 12 KB | Backend code |
| frontend/src/ | ~50 KB | React components + styling |
| frontend/build/ | ~180 KB | (Ignored, built on demand) |
| Documentation | ~70 KB | README, DESIGN, guides |
| Git repository | ~150 KB | History + objects |
| **Total (Committed)** | **~250 KB** | Small, fast to clone |
| **Total (Dev env)** | **~700 MB** | Includes node_modules + build |

## .gitignore Coverage

### Python Projects
- ✅ venv/, .venv/, env/, ENV/
- ✅ __pycache__/, *.pyc, *.pyo
- ✅ *.egg-info/, dist/, build/

### Node.js Projects
- ✅ node_modules/
- ✅ npm-debug.log, yarn-error.log

### IDE & Editors
- ✅ .vscode/, .idea/
- ✅ *.swp, *.swo, *~

### OS Files
- ✅ .DS_Store, Thumbs.db
- ✅ .Spotlight-V100, .Trashes

### Deployment & Build
- ✅ .env, .env.local
- ✅ .vercel/, frontend/build/

## Naming Conventions

### Components (React)
- ✅ PascalCase filenames: `FileUploader.jsx`
- ✅ Separate CSS files: `FileUploader.css`
- ✅ Default export for components

### Styling (CSS)
- ✅ BEM-like naming: `.file-item__icon`, `.file-item--active`
- ✅ CSS custom properties: `--color-accent`, `--space-3`
- ✅ Mobile-first responsive design

### Backend (Python)
- ✅ snake_case function names: `merge_pdfs()`
- ✅ Type hints on functions
- ✅ Docstrings for complex logic

### Configuration
- ✅ vercel.json - Vercel build config
- ✅ requirements.txt - Python packages
- ✅ package.json - Node packages

## Design System (CSS Tokens)

### Color Tokens
```css
--color-accent: #0071e3           /* Apple blue */
--color-bg-primary: #f5f5f7       /* Background */
--color-surface: rgba(255,255,255,0.72) /* Frosted glass */
--color-text-primary: #1d1d1f     /* Headings */
--color-text-secondary: #86868b   /* Body text */
```

### Spacing Tokens (8pt grid)
```css
--space-1: 8px
--space-2: 16px
--space-3: 24px
--space-4: 32px
--space-6: 48px
--space-8: 64px
```

### Animation Tokens
```css
--ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
--duration-short: 200ms
--duration-medium: 400ms
```

## Dependency Management

### Python (requirements.txt)
```
fastapi==0.104.1              - Web framework
uvicorn==0.24.0               - ASGI server
pikepdf==8.10.1               - PDF processing
mangum==0.25.0                - Vercel adapter
python-multipart==0.0.6       - File uploads
```

### Node.js (frontend/package.json)
```
react==18.2.0                 - UI library
react-dom==18.2.0             - DOM rendering
react-scripts==5.0.1          - CRA build tools
```

## Build Outputs

### Frontend Build
- Location: `frontend/build/`
- Size (gzipped): 46.94 kB JS + 2.36 kB CSS
- Command: `npm run build`
- Ignored in git: ✅

### Backend Build
- No build step (interpreted Python)
- Deployment: Vercel serverless via Mangum
- Python 3.9+ required

## Deployment Configuration

### Vercel (vercel.json)
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "routes": [
    { "src": "/api/(.*)", "dest": "api/merge.py" },
    { "src": "/(.*)", "dest": "frontend/build/index.html" }
  ]
}
```

### Local Development
- Backend: `uvicorn api.merge:app --reload`
- Frontend: `npm start` (from frontend/)
- Ports: 8000 (backend), 3000 (frontend)

## Documentation Structure

| File | Purpose | Audience |
|------|---------|----------|
| README.md | Project overview & features | Everyone |
| DESIGN.md | Design system & specifications | Designers, frontend devs |
| QUICKSTART.md | Local development guide | Developers |
| DEPLOYMENT.md | Vercel deployment steps | DevOps, deployment |
| ORGANIZATION.md | This file—file structure | Team members |

## Pre-Launch Verification

✅ **Code Organization**
- All files properly organized
- Clear separation of concerns (api/ vs frontend/)
- No duplicate or orphaned files

✅ **Git Configuration**
- .gitignore comprehensive
- No sensitive data in repo
- Clean commit history

✅ **Dependencies**
- requirements.txt present & complete
- package.json present & complete
- No unused dependencies

✅ **Documentation**
- All guides present (README, QUICKSTART, DEPLOYMENT, DESIGN)
- Instructions clear and accurate
- No broken references

✅ **Build & Deployment**
- Frontend builds successfully (46.94 kB JS)
- vercel.json configured correctly
- No build errors or warnings

---

**Status**: ✅ **Project is fully organized and ready for deployment**

*Last verified: 2026-04-02*
