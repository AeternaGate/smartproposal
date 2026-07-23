# Landing Redesign — Exaggerated Minimalism (Premium Dark)

**Date:** 2026-07-23
**Status:** Draft — design approved
**Scope:** Marketing landing page only (not dashboard or app UI)

---

## 1. Design Direction

**Approach B — Exaggerated Minimalism.** Premium dark minimalism with oversized typography, massive whitespace, and subtle micro-animations. Spacious, calm, expensive-feeling.

| Attribute | Choice |
|-----------|--------|
| Vibe | Premium / refined / calm |
| Theme | Dark-only (`#010102` canvas) |
| Typography | Geometric Sans (Satoshi or Plus Jakarta Sans) |
| Accent | Lavender-blue `#5e6ad2` (existing Propel brand) |
| Motion | Subtle — scroll-triggered reveals, micro-parallax, glow drift |
| Layout | Centered hero → stats → features → social proof → CTA |

## 2. Background (Completely Redone)

Replaces the current FlickeringGrid setup.

### Layers (bottom to top)

1. **Ambient gradient** — `radial-gradient(circle at 50% 0%, #0b0b1a 0%, #010102 70%)` as base. Gives depth without obvious patterns.

2. **Soft blooms** — 2 large chromatic orbs:
   - Element 1: `h-[55%] w-[60%] blur-[300px]` at `-left-[15%] -top-[10%]`, `bg-primary/15`
   - Element 2: `h-[40%] w-[45%] blur-[350px]` at `right-[5%] bottom-[20%]`, `bg-primary/10`
   - Both drift via CSS keyframes: 20-30s ease-in-out infinite alternate
   - Opacity ranges 0.7-1.0 within the animation

3. **Noise/grain texture (SVG filter)** — CSS pseudo-element overlay with `feTurbulence` + `feColorMatrix`, opacity `0.02`. Gives tactile premium feel (inspired by Linear, Stripe).

4. **Vignette** — pinned top layer over everything: `radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, #010102 100%)`. Darkens edges, focuses attention on center.

### Removed
- FlickeringGrid — overly tech/robotic for premium vibe
- Grid-sweep animation — decorative, not premium
- P watermark — too large, distracts

## 3. Typography

### Fonts
- **Plus Jakarta Sans** (Google Fonts) — geometric sans with premium character, easy CDN import. Weights: 400, 500, 600, 700, 800
- Fallback: system-ui, sans-serif
- Inter used only for UI elements (buttons, nav, small labels)

### Scale
| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero H1 | `clamp(3rem, 8vw, 5.5rem)` | 700-800 | -0.03em |
| Section H2 | `text-3xl` → `text-4xl` | 600 | -0.02em |
| Card title | `text-base` | 600 | normal |
| Body | `text-base` → `text-lg` | 400 | normal |
| Badge | `text-[11px] uppercase` | 500 | 0.12em |
| Small/tertiary | `text-xs` | 400 | normal |

### Line heights
- H1: `leading-[1.05]`
- H2: `leading-[1.15]`
- Body: `leading-relaxed`

## 4. Structure & Sections

### 4.1 Header (unchanged structure)
- Sticky, `bg-canvas/80 backdrop-blur-md`
- LogoFull → Sign In (text link) → Get Started (primary button with wave sweep)
- Button: `hover:scale-105` + gradient wave (existing)

### 4.2 Hero Section
- **Badge**: `AI-powered proposal platform` with BorderBeam, pulse dot, uppercase
- **H1**: `Proposals that close in minutes, not hours.` with `text-primary` on "close in minutes"
- **Subtitle**: max-w-md, `text-ink-muted`
- **CTA**: ShimmerButton (Start Free) + outline button (See Pricing) — existing, keep
- **Checklist**: 3 items with `CheckCircle` icons — keep existing
- No hero-visual SVG (right column removed). Full-width text hero with background as visual
- Animate entrance: badge (100ms) → H1 (200ms) → subtitle (300ms) → CTA (400ms) → checklist (500ms)

### 4.3 Stats Bar (unchanged)
- 4 stats in grid, gradient divider lines
- Only animation: slide-up stagger 100ms each
- Keep existing

### 4.4 Features (2×2 grid)
- **Remove** SpotlightCard wrapper (too much visual noise for premium)
- Replace with simple card: `border border-hairline bg-surface-1 rounded-xl p-8`
- Hover: `-translate-y-0.5` (2px lift), `border-primary/20`, `bg-surface-2`
- Bottom accent line on hover: `h-px scale-x-0 → scale-x-100` (existing)
- Icon box: square, bordered, `text-primary`
- Entrance: slide-up stagger 100ms

### 4.5 Social Proof (new section)
- **Label**: `Trusted by freelancers and agencies worldwide`
- Row of 5 grayscale placeholder logo marks (generic geometric icons via lucide-react: `Building2`, `Hexagon`, `Diamond`, `CircleDot`, `Component`)
- Each logo: inline SVG wrapper, opacity 30%, grayscale, hover: opacity 60% smooth
- Light separator section, no border top/bottom, subtle bg change

### 4.6 Final CTA
- Same as current: ShimmerButton + outline Sign In
- Radial gradient glow behind section (existing)

### 4.7 Footer (unchanged)

## 5. Animation System

### Scroll-triggered reveals
Each section on enter: `opacity: 0 → 1` + `translateY: 10px → 0`, 400ms ease-out.
Implementation: `motion` `useInView` with `once: true`.

| Element | Delay | Duration |
|---------|-------|----------|
| Hero items | 100ms stagger | 300ms each |
| Stats | 100ms stagger | 300ms each |
| Features | 100ms stagger | 400ms each |
| Social proof | 100ms stagger | 300ms each |
| Final CTA | 0ms | 400ms |

### Hover micro-interactions
- Cards: lift 2px, border accent, bottom line reveal (300ms)
- Buttons: scale 1.05, wave sweep (300ms)
- Links: color transition (150ms)

### Background animations
- Soft blooms: drift CSS animation, 20s / 25s infinite alternate
- Noise: static (no animation — always visible)
- Vignette: no animation

### Reduced motion
- All scroll animations fall back to opacity-only
- All drift animations disabled
- Respect `prefers-reduced-motion`

## 6. Color Palette (unchanged from DESIGN.md)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#5e6ad2` | Buttons, links, accent line |
| Primary/10-25 | opacity variants | Glows, hover states |
| Canvas | `#010102` | Page background |
| Surface 1 | `#0f1011` | Cards |
| Surface 2 | `#141516` | Hover card bg |
| Ink | `#f7f8f8` | H1, key text |
| Ink-muted | `#d0d6e0` | Body text |
| Ink-subtle | `#8a8f98` | Secondary |
| Ink-tertiary | `#62666d` | Small labels |
| Hairline | `#23252a` | Borders |
| Hairline-strong | `#34343a` | Strong borders |

## 7. Files to Create / Modify

### Modified
- `src/app/globals.css` — add noise texture CSS, new font import, new drift animation keyframes
- `src/app/page.tsx` — add react bits import, adjust hero section, add social proof section
- `src/components/landing/background.tsx` — complete rewrite (remove FlickeringGrid, add ambient gradient, blooms, noise, vignette)
- `src/components/landing/feature-card.tsx` — remove SpotlightCard, simplify to pure card
- `src/components/landing/hero-visual.tsx` — remove or simplify (no right-column visual)

### New
- `src/components/landing/social-proof.tsx` — trusted-by logos section

### Deleted
- `src/components/reactbits/spotlight-card.tsx` — no longer needed on landing
- `src/components/reactbits/shiny-text.tsx` — no longer needed

## 8. Not in Scope (for this phase)

- Dashboard UI redesign
- Font file downloading/hosting (Google Fonts CDN is fine)
- Logo redesign
- Any functional/backend changes

## 9. Edge Cases

- **Noise grain not rendering**: fallback to ambient gradient only
- **Font not loaded**: fallback to system-ui (interim flash)
- **Reduced motion**: all transforms become fade-only, no drift
- **Mobile**: hero stacks vertically, stats 2×2, features 1 column, social proof wraps
- **CLS**: font-display: swap, explicit heights on all animated containers
