import type { CurrencyCode, CurrencyDefinition, Lang } from "@/src/types";

/**
 * Local demonstration exchange rates.
 *
 * Every value expresses how many units of the currency equal 1 SAR
 * (the store base currency). These are illustrative constants only — they are
 * NOT live, official or continuously updated. When the app is connected to a
 * backend / Middleware API, `CURRENCIES` should be populated from that source
 * while keeping the same interface.
 */
export const CURRENCIES: CurrencyDefinition[] = [
  { code: "SAR", symbol: "ر.س", name: { ar: "الريال السعودي", en: "Saudi Riyal" }, perSar: 1 },
  { code: "AED", symbol: "د.إ", name: { ar: "الدرهم الإماراتي", en: "UAE Dirham" }, perSar: 0.9792 },
  { code: "USD", symbol: "$", name: { ar: "الدولار الأمريكي", en: "US Dollar" }, perSar: 0.2666 },
  { code: "EUR", symbol: "€", name: { ar: "اليورو", en: "Euro" }, perSar: 0.2459 },
  { code: "GBP", symbol: "£", name: { ar: "الجنيه الإسترليني", en: "British Pound" }, perSar: 0.2097 },
];

export const DEFAULT_CURRENCY: CurrencyCode = "SAR";

export function getCurrency(code: CurrencyCode): CurrencyDefinition {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/**
 * Convert a base-currency (SAR) amount into the target currency.
 * All product prices are stored in SAR, so this is the only place conversion
 * happens — screens must never convert twice.
 */
export function convertFromSar(baseSar: number, code: CurrencyCode): number {
  return convertBaseMajorToMajor(baseSar, code);
}

/** Convert base-SAR major units to target-currency major units. */
export function convertBaseMajorToMajor(baseSar: number, code: CurrencyCode): number {
  const sarMinor = Math.round(baseSar * 100);
  const targetMinor = convertMinorUnits(sarMinor, code);
  return targetMinor / 100;
}

/** Convert SAR minor units to target-currency minor units using integer arithmetic. */
export function convertMinorUnits(baseSarMinor: number, code: CurrencyCode): number {
  const rate = getCurrency(code).perSar;
  const rateScaled = Math.round(rate * 1_000_000);
  return Math.round((baseSarMinor * rateScaled) / 1_000_000);
}

function localeFor(lang: Lang): string {
  return lang === "ar" ? "ar-SA" : "en-US";
}

/** Format an already-converted amount using grouping + symbol. */
export function formatConverted(value: number, lang: Lang, code: CurrencyCode): string {
  const symbol = getCurrency(code).symbol;
  const formatted = new Intl.NumberFormat(localeFor(lang), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} ${symbol}`;
}

/**
 * Format a base-currency (SAR) amount for display in the selected currency.
 * This is the single entry point every price in the UI must use.
 */
export function formatPrice(baseSar: number, lang: Lang, code: CurrencyCode): string {
  return formatConverted(convertFromSar(baseSar, code), lang, code);
}

/** A price formatter bound to a language + currency (avoids repeated lookup). */
export function createPriceFormatter(lang: Lang, code: CurrencyCode) {
  return (baseSar: number) => formatPrice(baseSar, lang, code);
}