import type { Lang, Localized } from "@/src/types";

/** Resolve a localized field for the active language. */
export function pick(localized: Localized | undefined, lang: Lang, fallback = ""): string {
  if (!localized) return fallback;
  return localized[lang] ?? localized.ar ?? localized.en ?? fallback;
}

/** Convert centimetres to the requested display unit. */
export function measurement(cm: number, unit: "cm" | "in"): string {
  return unit === "cm" ? String(cm) : (cm / 2.54).toFixed(1);
}

/** Percentage saved between compare-at and current price (base currency). */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Build a stable cart line id from a product + selected variants. */
export function variantLineId(
  productId: number,
  colorId: string | null,
  sizeId: string | null,
): string {
  return `${productId}:${colorId ?? "-"}:${sizeId ?? "-"}`;
}

/** Generate a human friendly, non-authoritative demo order reference. */
export function demoOrderNumber(seed = Date.now()): string {
  const digits = String(seed).slice(-4).padStart(4, "0");
  return `NSJ-${digits}`;
}