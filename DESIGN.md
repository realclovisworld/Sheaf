# PDF Binder - Design System

## Overview

A quiet, intentional interface inspired by craft and print traditions. The visual language emphasizes function over ornamentation, with a sophisticated palette and deliberate spacing.

---

## Color Palette

### Primary
- **Rust** `#a0604e` – Warm, grounded accent color
  - Light variant: `#b8746a`
  - Dark variant: `#8a4e3f`

### Neutral
- **Cream (Background)** `#faf8f4` – Soft, warm white
- **Cream (Border)** `#e8e4da` – Subtle dividers
- **Black (Soft)** `#2a2620` – Primary text, warmer than pure black
- **Gray (Warm)** `#7a7066` – Secondary text, labels
- **Gray (Light)** `#d4cfc6` – Disabled states

### Semantic
- **Success** `#6b8e5f` – Validation, confirmations
- **Error** `#a0604e` – Same as rust (unified palette)

---

## Typography

### Fonts
- **Primary**: Newsreader (serif) – Headlines, primary copy
- **Secondary**: IBM Plex Sans (sans-serif) – UI, labels, secondary copy

### Sizes & Usage

| Role | Font | Size | Line Height | Weight | Letter-spacing |
|------|------|------|-------------|--------|---|
| H1 | Newsreader | 2rem | 1.4 | 400 | -0.5px |
| H2 | Newsreader | 1.1rem | 1.4 | 400 | -0.3px |
| Body | Newsreader | 1.25rem | 1.7 | 400 | 0 |
| Secondary | IBM Plex | 0.875rem | 1.4 | 400 | 0.3px |
| Small | IBM Plex | 0.75rem | 1.4 | 400 | 0.2px |
| Labels | IBM Plex | 0.875rem | 1.4 | 500 | 0.3px |

**Philosophy**: The serif font creates warmth and personality. Sans-serif is reserved for UI controls and supporting information. All text leans toward generous sizing for legibility.

---

## Spacing System

Vertical spacing is intentionally varied, not uniform. This creates rhythm and visual interest.

```
--space-xs:  0.5rem    (8px)
--space-sm:  1rem      (16px)
--space-md:  1.5rem    (24px)
--space-lg:  2rem      (32px)
--space-xl:  2.5rem    (40px)
--space-2xl: 3rem      (48px)
--space-3xl: 4rem      (64px)
```

### Container Layout
- Max-width: 680px (narrow, focused)
- Margin top: 4rem (generous breathing room)
- Padding sides: 2rem (comfortable gutters)

### Vertical Rhythm (Intentionally Asymmetrical)
1. Header to dropzone: 3rem
2. Dropzone to file list: 2.5rem
3. File list to bind button: 3rem
4. Button to footer: 2rem

**Result**: Visual movement without uniformity. Creates a sense of flow.

---

## Components

### File Uploader (Dropzone)

**Visual**:
- Border: 2px dashed cream
- Background: White
- Border-radius: 2px (subtle, not rounded)
- Icon: Text symbol (📄)
- CTA text: "Drag PDFs here. / Or browse"

**Interactive**:
- Hover: Faint rust background wash appears
- Drag-active: Border becomes rust, background stays white
- Focus (button): 2px rust outline, 2px offset

**Copy Philosophy**:
- Direct, calm language
- No exclamation marks
- No action verbs ("Upload", "Choose")
- Preference: "Drag", "Browse"

---

### File List

**Visual**:
- Container: 1px border, cream color
- Items: Subtle dividers (cream borders)
- Numbering: Sequential (1., 2., 3.)
- Hover state: Background tint (rust at 3% opacity)

**Secondary Actions**:
- Remove button appears only on row hover
- Icon: ✕ (simple, minimal)
- Color: Warm gray at 40% opacity until hover
- Hover: Changes to error color

**Responsive**:
- On mobile: Hide file size column
- Maintain numbering and remove action

---

### Bind Button

**Visual**:
- Background: Rust
- Text: "Bind" (short, actionable)
- Padding: 0.875rem 2rem
- Border-radius: 2px

**Interactive**:
- Hover: Slightly darker rust, lift 1px, subtle shadow
- Active: Returns to baseline
- Disabled: Gray with reduced opacity
- Loading: Shows spinner without text changes ("Binding…")

**Focus**:
- 2px rust outline
- 2px offset (accessible, not intrusive)

---

### Messages (Success / Error)

**Error**:
- Background: #fdf4f0 (light rust wash)
- Border-left: 3px solid rust
- Animation: Slide in from above (0.2s)

**Success**:
- Background: Light green wash
- Border-left: 3px solid success green
- Auto-dismisses after 3 seconds

**Copy**:
- Error: "Select at least two documents." / "Merge failed."
- Success: "PDF bound and ready."
- Quiet tone, no theatrical language

---

## Micro-Interactions

### Transitions
All transitions: 0.15s–0.2s `ease` (not `ease-in-out`)

### Hover States
- Files: Background tint fades in
- Button: Color darkens, slight lift
- Remove icon: Opacity increases on parent hover

### Focus States
- 2px solid outline
- Same color as element (rust for primary, etc.)
- 2px offset from element
- Always visible (not subtle)

### Loading State
- Spinner: 12px, 2px border, rotates at 0.8s
- Text updates: "Binding…"
- Button remains clickable? No, disabled

---

## Responsive Behavior

### Mobile (< 640px)

**Header**:
- Padding reduces: 2rem top, 1rem sides
- H1 size: 1.75rem

**Main content**:
- Padding: 2rem top, 1rem sides
- Max-width: still 680px (on viewport)

**Dropzone**:
- Padding reduces: 3rem vertical, 1rem horizontal
- Icon: 2rem (from 2.5rem)
- Text: 1.1rem (from 1.25rem)

**File list**:
- Hide size column
- Keep numbering and remove button
- Reduce font sizes proportionally

**Bind button**:
- Text shortens? No, still "Bind"
- Padding: 0.75rem 1.5rem
- Font size: 0.875rem

**Overall philosophy**: Simplify by removing secondary information (file sizes), but maintain hierarchy and interaction targets.

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Error/success rely on color + border for distinction

### Focus Management
- Focus outlines always visible
- 2px offset prevents overlap
- Tab order: Natural DOM order (no JavaScript reordering)

### ARIA
- `aria-label` on buttons describing action
- `aria-busy="true"` during loading
- Error messages: `role="alert"`
- Success: `role="status"` with auto-dismiss

### Reduced Motion
- Respects `prefers-reduced-motion` media query
- Animations set to 0.01ms when enabled
- All interactions still work

---

## Anti-Patterns (Deliberately Avoided)

❌ **Gradients** – Creates visual noise
❌ **Large border-radius** (16px+) – Feels too modern, trendy
❌ **Shadow-lg elevation** – Not part of the metaphor
❌ **Generic icons** – No Font Awesome, Lucide, or React Icons
❌ **Centered cards** – Feels corporate
❌ **Progress percentages** – Adds cognitive load
❌ **Celebratory copy** – "Success! Your files are ready!"
❌ **Drag-and-drop libraries** – Roll custom, maintain control

---

## Physical Metaphors

### Language Choices
- **"Bind"** instead of "Merge" – Evokes manual bookbinding
- **"Documents"** instead of "Files" – More human, less technical
- **"PDF Binder"** instead of "PDF Merger" – Craft tool, not utility

### Visual Metaphors
- Cream background: Paper tray
- Rust accents: Metal binding hardware
- Simple borders: Clean, crafted edges
- Asymmetrical spacing: Hand-assembled feeling

---

## Implementation Notes

### CSS Architecture
- CSS Modules optional (used in some components)
- Custom properties for all theme values
- No Tailwind utilities
- Intentional, semantic class names

### Font Loading
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital@0;1&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
```

### Transitions
```css
--transition-quick: 0.15s ease;
--transition-normal: 0.2s ease;
```

### Focus Outline Helper
```css
.element:focus {
  outline: 2px solid var(--color-rust);
  outline-offset: 2px;
}
```

---

## Success Criteria Met

✅ Feels like a **specialized tool**, not generic SaaS
✅ Every animation has **slight imperfection** (asymmetrical timing, easing)
✅ **No elements from component libraries** (custom everything)
✅ Typography creates **clear hierarchy** without bold weights
✅ Color palette **immediately distinctive**
✅ Physical metaphors **consistent throughout**
✅ Quiet, helpful tone in copy and UI
✅ Accessible: Focus visible, color contrast, reduced-motion support
✅ Responsive without sacrificing identity

---

## Future Considerations

- Dark mode: Reverse palette (rust stays, creams → dark grays)
- Multi-language: Newsreader supports multiple scripts via `unicode-range`
- Print styles: Cream background removes for paper, focuses content
- Animation preferences: Already respects `prefers-reduced-motion`

