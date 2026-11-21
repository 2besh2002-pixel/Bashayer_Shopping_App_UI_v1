import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CurrencyCode, Lang } from "@/src/types";
import { activeStore } from "@/store-configs";

interface SettingsState {
  lang: Lang;
  currency: CurrencyCode;
  /** Measurement unit preference for the size guide. */
  unit: "cm" | "in";
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  setCurrency: (currency: CurrencyCode) => void;
  setUnit: (unit: "cm" | "in") => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      lang: activeStore.defaultLanguage,
      currency: activeStore.defaultCurrency,
      unit: "cm",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((s) => ({ lang: s.lang === "ar" ? "en" : "ar" })),
      setCurrency: (currency) => set({ currency }),
      setUnit: (unit) => set({ unit }),
    }),
    {
      name: "naseej:settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);