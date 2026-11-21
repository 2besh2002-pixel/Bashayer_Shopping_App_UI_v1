import { useMemo } from "react";

import { useSettingsStore } from "@/src/stores/settingsStore";
import { translate, type TranslationKey } from "@/src/i18n/translations";
import type { Lang } from "@/src/types";

export interface TranslationApi {
  t: (key: TranslationKey) => string;
  lang: Lang;
  isRTL: boolean;
  dir: "rtl" | "ltr";
}

/**
 * Central translation hook. Every screen uses this instead of hardcoding copy.
 * Re-renders automatically when the language changes.
 */
export function useTranslation(): TranslationApi {
  const lang = useSettingsStore((s) => s.lang);
  return useMemo(() => {
    const isRTL = lang === "ar";
    return {
      lang,
      isRTL,
      dir: isRTL ? "rtl" : "ltr",
      t: (key: TranslationKey) => translate(lang, key),
    };
  }, [lang]);
}