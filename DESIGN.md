# PDF Merger - Apple Design Language

This document describes the visual design system and implementation details for the PDF Merger application, based on Apple's Human Interface Guidelines.

## Design Philosophy

The interface embodies Apple's design principles: **meticulous craftsmanship, understated elegance, and fluid motion**. Every element feels considered, every animation purposeful. The interface disappears; only the task remains.

## Color Palette

### Light Mode
- **Background**: `#f5f5f7` — Apple's signature warm gray
- **Surface**: `rgba(255, 255, 255, 0.72)` with `backdrop-filter: blur(20px)` — frosted glass
- **Text (Primary)**: `#1d1d1f` — almost black
- **Text (Secondary)**: `#86868b` — Apple's signature gray
- **Text (Tertiary)**: `#a1a1a6` — disabled, placeholder text
- **Accent Blue**: `#0071e3` — Apple's system blue (use sparingly)
- **Accent Green**: `#34c759` — success states only
- **Destructive**: `#ff3b30` — rare, intentional use only

### Dark Mode
Automatic via `prefers-color-scheme: dark`
- **Background**: `#000000`
- **Surface**: `rgba(28, 28, 30, 0.72)` with blur
- **Text**: `#f5f5f7` / `#98989d` / `#6e6e73`

## Typography

**Font Stack**: 
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
```

### Type Scale
- **Large Title**: 34px, weight 700, tracking -0.022em
- **Title 1**: 28px, weight 700, tracking -0.021em
- **Title 2**: 22px, weight 700, tracking -0.021em
- **Headline**: 17px, weight 600, tracking -0.021em
- **Body**: 17px, weight 400, tracking -0.021em
- **Callout**: 16px, weight 400, tracking -0.021em
- **Subhead**: 15px, weight 400, tracking -0.021em
- **Footnote**: 13px, weight 400, tracking -0.006em
- **Caption**: 12px, weight 400, tracking 0em

## Components

### Dropzone (File Upload)
**Visual Design**:
- Full-bleed rounded rectangle with continuous corners (`border-radius: 20px`)
- Background: `rgba(255, 255, 255, 0.72)` with `backdrop-filter: blur(20px) saturate(180%)`
- Border: `1px rgba(255, 255, 255, 0.2)` — barely visible
- Subtle inset glow: `inset 0 0 0 1px rgba(255, 255, 255, 0.1)`
- Soft shadow: `0 4px 24px rgba(0, 0, 0, 0.04)`

**Content**:
- Center icon (SF Symbol or emoji): 64px
- Title: "Drop PDFs here" (Title 2)
- Hint: "or click to browse" (Callout, secondary color)
- Button: "Select Files" (Callout, outlined style)

**Interaction States**:
- **Hover**: No change on desktop (not clicked)
- **Drag Over**: 
  - Scale: `scale(1.02)` 
  - Background: `rgba(0, 113, 227, 0.08)`
  - Border: `rgba(0, 113, 227, 0.5)`
  - Icon bounce: `scale(1.1) translateY(-4px)` with bounce easing
- **Active**: Opacity 0.8 momentarily

**Animations**:
- Duration: 400ms standard, 500ms for bounce
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce physics

### File List (Files App Style)
**Row Design**:
- Minimum touch height: 44px
- Padding: 16px horizontal, 12px vertical
- Separator: 1px divider between rows

**Content Layout**:
```
[icon 24px] [12px] [filename] [flex spacer] [size] [12px] [remove button] [16px]
```

**Typography**:
- Filename: Body (17px, primary color)
- File size: Footnote (13px, tertiary color)
- Icon: 24px, secondary color

**Interaction States**:
- **Normal**: `background: var(--color-surface)`
- **Hover**: `background: rgba(0, 0, 0, 0.03)` — barely perceptible
- **Remove button**: Appears on hover (opacity transition)
- **Remove button hover**: `background: rgba(255, 59, 48, 0.1)`, color `#ff3b30`
- **Active**: `opacity: 0.8` momentarily

**Focus States**:
- 2px solid outline with `outline-offset: 2px`
- Color: `var(--color-accent)`

### Merge Button (Apple Button)
**Design**:
- Shape: Pill (`border-radius: 980px`)
- Background: `#0071e3` (Apple blue)
- Color: White
- Padding: 12px 32px
- Font: 17px, weight 600
- Minimum width: 180px

**States**:
- **Normal**: Solid blue
- **Hover**: `#0077ed` (slightly lighter)
- **Active**: `scale(0.96)` with 100ms easing
- **Disabled**: `background: rgba(0, 0, 0, 0.05)`, `color: rgba(0, 0, 0, 0.25)`
- **Loading**: Spinner replaces text (blue spinner, 16px)

**Focus State**:
- 2px solid outline with `outline-offset: 2px`

### Loading State
**Progress Indicator**:
- Indeterminate circular progress ring
- Stroke width: 2px
- Color: Apple blue `#0071e3`
- Animation: `stroke-dashoffset` with `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Size: 32px (dropzone), 16px (button)

**Label**:
- Text: "Merging..." (Callout, secondary color)
- Optional subtext: "3 of 4 documents" (Caption, tertiary)

### Success & Error Messages
**Container**:
- Padding: 16px
- Border-radius: 12px
- Font: 17px, weight 400
- Icon: 20px symbol

**Success**:
- Background: `rgba(52, 199, 89, 0.1)`
- Color: `#1f7818` (light), `#30b0c0` (dark mode)
- Animation: Slide up + fade in, 200ms entrance easing

**Error**:
- Background: `rgba(255, 59, 48, 0.1)`
- Color: `#d70015` (light), `#ff453a` (dark mode)
- Animation: Same as success

### Empty State
**Layout**:
- Vertically centered
- Icon: 48px, opacity 0.5
- Title: "No PDFs" (Title 2, primary)
- Body: "Drop files to merge them into one document" (Body, secondary)
- Max-width: 300px

**Spacing**:
- Gap between elements: 8px

## Layout & Spacing

### Grid System
**8pt base grid**:
- Micro: 8px (`--space-1`)
- Small: 16px (`--space-2`)
- Regular: 24px (`--space-3`)
- Medium: 32px (`--space-4`)
- Large: 48px (`--space-6`)
- Hero: 64px (`--space-8`)

### Container
- Max-width: 800px
- Margin: 0 auto
- Padding: 24px (desktop), 16px (mobile)

### Vertical Rhythm
- App header to dropzone: 32px
- Dropzone to list: 32px
- List to button: 32px
- Consistent, grid-based spacing (no arbitrary values)

## Motion & Animation

### Easing Functions
- **Standard**: `cubic-bezier(0.25, 0.1, 0.25, 1)` — default, smooth
- **Entrance**: `cubic-bezier(0.0, 0.0, 0.2, 1)` — decelerate on entry
- **Exit**: `cubic-bezier(0.4, 0.0, 1, 1)` — accelerate on exit
- **Bounce**: `cubic-bezier(0.34, 1.56, 0.64, 1)` — playful, spring-like

### Durations
- **Micro**: 100ms (button press feedback)
- **Short**: 200ms (hover states, toggles)
- **Medium**: 400ms (transitions, reveals)
- **Long**: 600ms (page transitions, large reveals)

### Principles
- **Content-aware**: Larger elements move slower
- **Continuity**: Elements maintain identity across states
- **Responsiveness**: Immediate acknowledgment, even if processing continues
- **Asymmetry**: Timing varies slightly between entrance/exit for natural feel

### Specific Animations

#### Dropzone Drag-Over
```css
.dropzone--drag-over {
  transform: scale(1.02);
  transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
}

.dropzone--drag-over .dropzone__icon {
  transform: scale(1.1) translateY(-4px);
  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### Button Press
```css
.merge-button:active {
  transform: scale(0.96);
  transition: transform 100ms ease;
}
```

#### Message Appearance
```css
@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message {
  animation: messageSlide 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
```

#### Spinner
```css
@keyframes spinnerRotate {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spinnerRotate 0.8s linear infinite;
}
```

## Responsive Behavior

### Mobile (< 640px)
- **Margins**: Reduce to 16px
- **Padding**: 16px on all sides
- **Dropzone**: Minimum height 160px, padding 16px
- **Icons**: 48px (from 64px)
- **Typography**: Reduce title sizes by 1-2 sizes
- **File list**: Remove buttons always visible (not hover-reveal)
- **Button**: Full width with 16px margins

### Key Breakpoint
- **640px**: Switch from desktop to mobile layout

### Principles
- No hamburger menus or drawer navigation
- Single column, maintained hierarchy
- Touch targets minimum 44px height

## Accessibility

### Color Contrast
- Text on background: WCAG AAA (7:1+)
- Text on surface: WCAG AAA (7:1+)
- All text sizes 17px+

### Focus Visible
- 2px solid outline, 2px offset
- Color: Same as interaction element
- Respects `:focus-visible` for keyboard navigation

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dynamic Type
- Font sizes scale with system settings
- Line heights maintain readability
- Respects user preferences

### Semantic HTML
- Buttons use `<button>` element
- Links are `<a>` elements
- Form inputs properly labeled
- ARIA labels where needed

## Implementation Notes

### CSS Custom Properties (Variables)
All design tokens defined as CSS variables in `:root`:
```css
--color-accent: #0071e3
--ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1)
--duration-medium: 400ms
--space-3: 24px
```

### Backdrop Filter Support
Frosted glass effect uses `backdrop-filter: blur(20px) saturate(180%)`. Ensure fallback for unsupported browsers (opacity only).

### Dark Mode
Automatic switching via `prefers-color-scheme: dark` media query. No manual toggle; respects system settings.

### No Icon Library
Uses system emojis and single-character symbols for simplicity:
- `📄` — document
- `✕` — close/remove
- `✓` — checkmark/success

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#0071e3` | Buttons, links, highlights |
| `--color-surface` | `rgba(255, 255, 255, 0.72)` | Cards, containers |
| `--color-text-primary` | `#1d1d1f` | Headings, main text |
| `--ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Default motion |
| `--duration-medium` | `400ms` | Standard transitions |
| `--space-3` | `24px` | Regular spacing |

## Success Criteria

✓ Interface feels immediately familiar to Apple users  
✓ Every animation uses Apple's specific easing curves  
✓ No visual noise — every element earns its place  
✓ Dark mode is seamless and automatic  
✓ Typography adapts to system settings  
✓ The app feels native, not web-based  
✓ Confidence without arrogance — the design serves, never shows off
