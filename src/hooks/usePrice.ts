import { useMemo } from "react";

import { useSettingsStore } from "@/src/stores/settingsStore";
import { createPriceFormatter } from "@/src/utils/currency";

/**
 * Returns a price formatter bound to the active language + currency.
 * All monetary values in the UI must be rendered through this hook so that a
 * currency change converts every price consistently (never double-converts).
 */
export function usePrice(): (baseSar: number) => string {
  const lang = useSettingsStore((s) => s.lang);
  const currency = useSettingsStore((s) => s.currency);
  return useMemo(() => createPriceFormatter(lang, currency), [lang, currency]);
}