/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-primary": "#dec800",
        "secondary-container": "#e4e2e1",
        "tertiary-container": "#00feff",
        "surface-charcoal": "#2E2E2E",
        "outline-variant": "#cdc7aa",
        "surface-dim": "#e0dac7",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#726600",
        "on-error-container": "#93000a",
        "inverse-surface": "#333123",
        "on-tertiary-fixed": "#002020",
        "brand-yellow": "#FFE600",
        "tertiary-fixed-dim": "#00dcdd",
        "neutral-gray-mid": "#E0E0E0",
        "on-secondary-fixed": "#1b1c1c",
        "on-secondary": "#ffffff",
        "surface-container-low": "#faf3df",
        "surface-container": "#f4eeda",
        "surface": "#fff9e9",
        "primary-fixed-dim": "#dec800",
        "on-primary": "#ffffff",
        "primary": "#6a5f00",
        "on-surface": "#1e1c10",
        "on-primary-fixed": "#201c00",
        "primary-container": "#ffe600",
        "secondary": "#5f5e5e",
        "outline": "#7c775f",
        "secondary-fixed": "#e4e2e1",
        "neutral-gray-light": "#F6F6F6",
        "surface-container-high": "#eee8d4",
        "on-tertiary": "#ffffff",
        "surface-variant": "#e8e2cf",
        "on-surface-variant": "#4b4731",
        "on-secondary-container": "#656464",
        "on-tertiary-container": "#007272",
        "error-container": "#ffdad6",
        "background": "#fff9e9",
        "on-background": "#1e1c10",
        "on-secondary-fixed-variant": "#474747",
        "surface-bright": "#fff9e9",
        "tertiary": "#006a6a",
        "on-tertiary-fixed-variant": "#004f50",
        "secondary-fixed-dim": "#c8c6c6",
        "on-primary-fixed-variant": "#504700",
        "tertiary-fixed": "#00fbfc",
        "inverse-on-surface": "#f7f1dd",
        "primary-fixed": "#fde400",
        "interactive-blue": "#0072C6",
        "on-error": "#ffffff",
        "error": "#ba1a1a",
        "surface-container-highest": "#e8e2cf",
        "surface-tint": "#6a5f00"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "section-gap": "80px",
        "unit": "8px",
        "margin-mobile": "16px",
        "gutter": "24px",
        "container-max": "1280px"
      },
      fontFamily: {
        "headline-md": ["Inter"],
        "headline-lg": ["Inter"],
        "display-xl": ["Inter"],
        "label-sm": ["Inter"],
        "quote-text": ["Inter"],
        "headline-lg-mobile": ["Inter"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"]
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 230, 0, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(255, 230, 0, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255, 230, 0, 0)" }
        }
      },
      animation: {
        "shimmer": "shimmer 1.5s infinite linear",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out"
      }
    },
  },
  plugins: [],
}
