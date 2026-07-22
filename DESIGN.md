---
version: 1.0
name: Propel-brand
description: "Brand identity and design system for Propel — AI proposal platform for freelancers and small agencies."
---

# Propel Brand Identity

## Name
**Propel** — from "propel" (to drive forward). Short, active, memorable. A verb that captures what the product does: move proposals from draft to signed.

### Why Propel
- 6 letters, one syllable — unforgettable
- A real English word with clear meaning
- Action-oriented (forward motion, velocity)
- Domain: propel.app, propel.dev, propel.so

### Tagline
**Propel — Proposals that close.**

## Brand Voice

| Quality | Description |
|---------|-------------|
| Tone | Confident, direct, human — not corporate or robotic |
| Audience | Freelancers & small agencies — speaks their language |
| Personality | Expert partner, not a salesperson. "Here's how we win this." |
| AI framing | AI as tool, not magic. "Your co-pilot for proposals." |

## Logo

### Logomark
A stylized lowercase "p" built from two forms:
- A bold vertical stroke (the stem) with a subtle forward lean
- A folded corner at bottom-right, suggesting a document page
- The counter (enclosed space in "p") forms an arrow pointing forward ↗

### LogoFull
Logomark + "Propel" wordmark in Inter SemiBold, tracked at -0.3px

### Clear Space
Minimum 16px clear space around the logo on all sides.

### Minimum Size
- Logomark: 24px
- LogoFull: 120px

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#5e6ad2` | Buttons, links, active states, logo |
| Primary hover | `#828fff` | Button hover |
| Canvas | `#010102` | Page background |
| Surface 1 | `#0f1011` | Cards, inputs |
| Surface 2 | `#141516` | Dropdowns, popovers |
| Ink | `#f7f8f8` | Primary text |
| Ink muted | `#d0d6e0` | Secondary text |
| Ink subtle | `#8a8f98` | Tertiary text, labels |
| Ink tertiary | `#62666d` | Placeholder text |
| Hairline | `#23252a` | Borders |
| Hairline strong | `#34343a` | Stronger borders |

## Typography

### Display
Inter Tight, letterspacing -0.02em for headings

### Body
Inter, 16px, -0.01em

### Code
JetBrains Mono

## Visual Principles

1. **Dark-only.** No light mode. The near-black canvas (#010102) is the foundation.
2. **One accent color.** Lavender-blue (#5e6ad2) is the only chromatic element.
3. **No shadows.** Cards use 1px hairline borders instead.
4. **SVG only.** No emoji, no PNG, no raster icons. All icons from lucide-react.
5. **Dense UI.** Every pixel earns its place. No decorative flourishes.
6. **8px grid.** All spacing is 8px or multiples thereof.
7. **Motion as feedback.** Animations are brief (150-300ms) and purposeful.

## Do's and Don'ts

### Do
- Default to dark theme everywhere
- Use lavender (#5e6ad2) ONLY for: primary buttons, links, focus rings, brand mark
- Use SVG icons from lucide-react — never emoji
- Cards get 1px hairline border, no shadow
- Keep UI dense and functional

### Don't
- Never use emoji — use lucide-react SVG icons
- Never use #000000 true black — always #010102
- Don't pill-round CTAs (use 8px)
- Don't add decorative gradients
- Don't introduce a second accent color

## Animations

- Micro-interactions: 150ms ease-out
- Page transitions: 300ms ease-out
- Modals/overlays: 200ms ease-out + scale(0.95)
- Mobile nav: 200ms ease-out slide-in-right
- Loading: skeleton-pulse at 1.5s infinite
- Respect `prefers-reduced-motion`: reduce to 0ms or just opacity

## Icon & Image Guidelines

### Icons
- **lucide-react** for all UI icons — size-4 or size-5
- Brand marks: inline SVG in `src/components/ui/icons.tsx`
- All icons SVG — no PNG, no emoji, no Unicode symbols

### Custom Illustrations
- Empty states: generate as inline SVG React components in `src/components/ui/icons.tsx`
- Use currentColor for fill, allow className prop
- Style: minimal line-art with 2px strokes, matching the hairline aesthetic
