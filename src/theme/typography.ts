import type { Lang } from "@/src/types";

/**
 * Font families loaded in the root layout via @expo-google-fonts.
 *
 * Arabic headings intentionally use Noto Sans Arabic (matching the reference
 * stylesheet, where `[dir="rtl"] h1` overrides the Playfair serif), while Latin
 * headings use the Playfair Display serif.
 */
export const FONT_WEIGHTS = [400, 500, 600, 700] as const;
export type FontWeight = (typeof FONT_WEIGHTS)[number];

export const typographyScale = {
  heading: 24,
  section: 18,
  product: 16,
  body: 15,
  supporting: 13,
  navigation: 12,
  button: 15,
} as const;

const DM_SANS: Record<FontWeight, string> = {
  400: "DMSans_400Regular",
  500: "DMSans_500Medium",
  600: "DMSans_600SemiBold",
  700: "DMSans_700Bold",
};

const NOTO_ARABIC: Record<FontWeight, string> = {
  400: "NotoSansArabic_400Regular",
  500: "NotoSansArabic_500Medium",
  600: "NotoSansArabic_600SemiBold",
  700: "NotoSansArabic_700Bold",
};

export const PLAYFAIR_SEMIBOLD = "PlayfairDisplay_600SemiBold";
export const PLAYFAIR_ITALIC = "PlayfairDisplay_600SemiBold_Italic";

interface FontOptions {
  weight?: FontWeight;
  /** Use the display serif (Latin) / bold Arabic face for headings. */
  serif?: boolean;
  italic?: boolean;
}

/**
 * Resolve the concrete font family for a language + weight + role.
 * Keeping this centralized means screens never hardcode font names.
 */
export function fontFamilyFor(lang: Lang, opts: FontOptions = {}): string {
  const weight = opts.weight ?? 400;

  if (opts.serif) {
    if (lang === "ar") return NOTO_ARABIC[opts.weight ? weight : 600] ?? NOTO_ARABIC[600];
    if (opts.italic) return PLAYFAIR_ITALIC;
    return PLAYFAIR_SEMIBOLD;
  }

  return lang === "ar" ? NOTO_ARABIC[weight] : DM_SANS[weight];
}