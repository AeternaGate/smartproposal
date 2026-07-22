---
version: alpha
name: Linear-design-analysis
description: "A near-black product-focused marketing canvas built around #010102 (the deepest dark surface of any tool in this collection), light gray text (#f7f8f8), and the signature Linear lavender-blue (#5e6ad2) used as the single chromatic accent. The system reads as software-craft documentation: dense, technical, and quietly luxurious."

colors:
  primary: "#5e6ad2"
  on-primary: "#ffffff"
  primary-hover: "#828fff"
  primary-focus: "#5e69d1"
  ink: "#f7f8f8"
  ink-muted: "#d0d6e0"
  ink-subtle: "#8a8f98"
  ink-tertiary: "#62666d"
  canvas: "#010102"
  surface-1: "#0f1011"
  surface-2: "#141516"
  surface-3: "#18191a"
  surface-4: "#191a1b"
  hairline: "#23252a"
  hairline-strong: "#34343a"
  semantic-success: "#27a644"
  semantic-overlay: "#000000"

typography:
  display-xl:
    fontFamily: "Inter, SF Pro Display, system-ui"
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -3.0px
  display-lg:
    fontFamily: "Inter, SF Pro Display, system-ui"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -1.8px
  display-md:
    fontFamily: "Inter, SF Pro Display, system-ui"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -1.0px
  headline:
    fontFamily: "Inter, SF Pro Display, system-ui"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.6px
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: -0.05px
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.20
    letterSpacing: 0

rounded:
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 8px 14px
    border: "1px solid {colors.hairline}"
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  feature-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
    border: "1px solid {colors.hairline}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    height: 56px
---

# SmartProposal Design System

Adapted from Linear's design system for SmartProposal's dashboard.

## Overview

Dark theme dashboard with lavender-blue (#5e6ad2) accent. Near-black canvas (#010102), charcoal cards (#0f1011), and hairline borders (#23252a). Minimal, precise, developer-centric.

## Do's and Don'ts

### Do
- Use dark theme as default (no light mode)
- Use lavender ONLY for: primary buttons, links, focus rings, brand mark
- Use SVG icons from lucide-react — never emoji
- Cards get 1px hairline border, no shadow
- Keep UI dense and functional

### Don't
- Never use emoji in UI — use lucide-react SVG icons for everything
- Never use #000000 true black — always #010102
- Don't pill-round CTAs (use 8px)
- Don't add decorative gradients
- Don't introduce a second accent color

## Animations

All animations use Tailwind v4's built-in animation utilities + CSS custom properties.

### Guidelines
- Duration: 150-300ms for micro-interactions (hover, focus, switch)
- 400-700ms for page transitions and modals
- Use `ease-out` for element enter, `ease-in` for element exit
- Prefer `transform` and `opacity` only (GPU-composited) — never animate `width`, `height`, `top`, `left`
- Respect `prefers-reduced-motion` — reduce all motion to 0ms or just opacity

### Available Animations
- `fade-in`: opacity 0→1
- `slide-up`: translateY(8px)→0 + fade
- `scale-in`: scale(0.95)→1 + fade
- `slide-in-right`: translateX(100%)→0 — for mobile nav
- `skeleton-pulse`: for loading states

## Icon & Image Generation

### Icons
- **lucide-react** for all UI icons — always use with `className="size-4"` or `size-5`
- For brand/logo icons: generate inline SVG components in `src/components/ui/icons.tsx`
- All icons must be SVG — no PNG, no emoji, no Unicode symbols

### Images/Illustrations
- Generate inline SVG illustrations for:
  - Empty states (`NoDocuments`, `NoTemplates`, `NoResults`)
  - Brand logo variants (`LogoFull`, `Logomark`)
  - Feature illustrations on landing page
- SVG generation: create as React components, use currentColor for fill, allow size prop
- For user avatars: generate gradient SVG initials fallback (e.g., bg-[#5e6ad2] + white first letter)
