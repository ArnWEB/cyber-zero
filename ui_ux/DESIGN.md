---
name: Global Enterprise Clarity
colors:
  surface: '#fff9e9'
  surface-dim: '#e0dac7'
  surface-bright: '#fff9e9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3df'
  surface-container: '#f4eeda'
  surface-container-high: '#eee8d4'
  surface-container-highest: '#e8e2cf'
  on-surface: '#1e1c10'
  on-surface-variant: '#4b4731'
  inverse-surface: '#333123'
  inverse-on-surface: '#f7f1dd'
  outline: '#7c775f'
  outline-variant: '#cdc7aa'
  surface-tint: '#6a5f00'
  primary: '#6a5f00'
  on-primary: '#ffffff'
  primary-container: '#ffe600'
  on-primary-container: '#726600'
  inverse-primary: '#dec800'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#006a6a'
  on-tertiary: '#ffffff'
  tertiary-container: '#00feff'
  on-tertiary-container: '#007272'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fde400'
  primary-fixed-dim: '#dec800'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#00fbfc'
  tertiary-fixed-dim: '#00dcdd'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f50'
  background: '#fff9e9'
  on-background: '#1e1c10'
  surface-variant: '#e8e2cf'
  surface-charcoal: '#2E2E2E'
  brand-yellow: '#FFE600'
  interactive-blue: '#0072C6'
  neutral-gray-light: '#F6F6F6'
  neutral-gray-mid: '#E0E0E0'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  quote-text:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '300'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style

This design system is built for high-trust, enterprise-grade environments where clarity and professional authority are paramount. It reflects a global perspective through a clean, systematic approach that balances corporate tradition with modern efficiency.

The visual style is **Minimalist and Corporate**, utilizing a precision-focused layout that emphasizes whitespace to reduce cognitive load. It avoids decorative flourishes in favor of structural integrity, using strong alignment and a disciplined color palette to convey reliability and scale. The emotional response is one of confidence, stability, and "quiet luxury" in a business context.

## Colors

The palette is anchored by the signature brand yellow, used sparingly as a high-impact signal for branding and key call-to-actions. The primary functional colors are charcoal and white, creating a high-contrast environment that ensures maximum legibility.

- **Primary (Yellow):** Reserved for brand moments, icons, and primary action highlights.
- **Secondary (Charcoal):** Used for typography, dark-mode sections, and high-emphasis containers.
- **Surface Strategy:** The default mode is light. Use white for primary content surfaces and light gray (#F6F6F6) for section nesting or subtle differentiation.
- **Interactive:** A specific blue is utilized for standard hyperlinking and utility navigation to maintain web-standard usability within a corporate frame.

## Typography

The design system utilizes **Inter** exclusively to ensure a systematic, utilitarian, and highly legible appearance across all digital touchpoints. 

The hierarchy is built on significant weight contrast rather than complex font pairings. Headings use semi-bold and bold weights to anchor sections, while body text maintains generous line-heights for comfortable long-form reading. Quotes are distinguished by a lighter weight and larger scale to serve as editorial "breathing room" within content-heavy pages.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure content remains focused and professional, transitioning to a fluid model for mobile devices.

- **Grid:** A 12-column grid system with 24px gutters.
- **Vertical Rhythm:** Sections are separated by significant gaps (80px on desktop) to enforce the minimalist aesthetic and allow the "Professional Yellow" accents to stand out.
- **Responsiveness:** At the 768px breakpoint (Tablet), margins reduce to 24px. At 480px (Mobile), margins reduce to 16px and multi-column card layouts reflow into a single vertical stack.

## Elevation & Depth

The design system prioritizes a **flat, structural depth** model. Hierarchy is communicated through tonal layering and clear containment rather than shadows.

- **Low-Contrast Outlines:** Use 1px solid borders in `neutral-gray-mid` for cards and input fields to define boundaries without adding visual weight.
- **Tonal Layers:** High-priority cards may sit on a `neutral-gray-light` background to create a subtle separation from the white primary canvas.
- **Zero Shadows:** Shadows are generally avoided. Depth is achieved via "stacked" blocks of color (e.g., a charcoal footer meeting a white content area).

## Shapes

The shape language is **Soft yet Precise**. While the overall mood is architectural, a very subtle rounding (4px) is applied to interactive elements and containers to make the interface feel modern and accessible.

- **Base Radius:** 4px for buttons, input fields, and cards.
- **Interactive Feedback:** No change in radius on hover; interaction is signaled through color shifts (e.g., yellow to a slightly darker gold or charcoal to light gray).

## Components

### Buttons
- **Primary:** Brand yellow background with charcoal text. Square edges with 4px radius. No shadow.
- **Secondary:** Charcoal background with white text.
- **Tertiary (Ghost):** No background, charcoal text with a 1px charcoal border or a simple underlined text link for "Explore" style actions.

### Cards
- **Editorial Card:** White background, 1px light gray border, subtle 4px corner radius. Used for "10 reasons" or team highlights. Images should be top-aligned with no internal padding for the image itself.
- **Action Card:** Large, clickable blocks with centered icons or bold typography, often used for "Experienced Professionals" or "Students" entry points.

### Input Fields & Controls
- **Text Inputs:** White background, 1px gray border. Labels sit above the field in `label-sm` weight.
- **Accordions:** Used for "What it's like to work here" sections. Clean horizontal dividers with a simple '+' or '-' toggle icon on the right.

### Navigation
- **Global Header:** White background, minimal gray bottom border. Logo on the left, utility search and primary navigation links on the right using `label-sm` styling.