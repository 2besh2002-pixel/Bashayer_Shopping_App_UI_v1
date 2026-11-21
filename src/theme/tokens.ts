/**
 * Design tokens ported from the NASEEJ design reference
 * (Bashayer_Shopping_App_UI_v1/src/index.css).
 *
 * These values are the single source of truth for brand colours. Tailwind
 * (tailwind.config.js) mirrors the same palette so `className` utilities stay in
 * sync, while these constants are available for `style` props, SVG icons and
 * non-NativeWind use cases.
 */
export const colors = {
  wine: "#6b2637",
  wineDark: "#4f1726",
  ink: "#211e1c",
  muted: "#78706a",
  line: "#e8e1d8",
  cream: "#f8f5ef",
  paper: "#fffdf9",
  moss: "#53705a",
  goldStar: "#b48847",
  // Supporting shades used by individual screens.
  chipBg: "#f3efe9",
  inputBg: "#f3efe9",
  summaryBg: "#f5f1eb",
  danger: "#4a2027",
  toastBg: "#28231f",
  swatchBorder: "#d9d1ca",
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

/** Shared spacing scale (kept small to match the compact reference UI). */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  "2xl": 28,
} as const;