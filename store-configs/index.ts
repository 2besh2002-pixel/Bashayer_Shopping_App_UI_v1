import type { CurrencyCode } from "@/src/types";
import { colors } from "@/src/theme/tokens";

/**
 * Store-specific configuration (white-label layer).
 *
 * All brand-specific values live here and in src/theme so another store identity
 * can be introduced later without editing individual screens. Keep this separate
 * from the shared application core.
 */
export interface StoreConfig {
  id: string;
  name: string;
  /** Arabic wordmark shown next to the Latin logotype. */
  wordmark: string;
  logoText: string;
  brand: {
    primary: string;
    primaryDark: string;
    ink: string;
    paper: string;
    accent: string;
  };
  defaultCurrency: CurrencyCode;
  defaultLanguage: "ar" | "en";
  /** Feature flags for optional modules. */
  features: {
    wishlist: boolean;
    reviews: boolean;
    notifications: boolean;
    checkout: boolean;
  };
  /** Ordered list of home page sections (for future remote config). */
  homeSections: Array<"hero" | "categories" | "mood" | "newArrivals">;
}

export const naseejStore: StoreConfig = {
  id: "naseej",
  name: "NASEEJ",
  wordmark: "نسيج",
  logoText: "N",
  brand: {
    primary: colors.wine,
    primaryDark: colors.wineDark,
    ink: colors.ink,
    paper: colors.paper,
    accent: colors.goldStar,
  },
  defaultCurrency: "SAR",
  defaultLanguage: "ar",
  features: {
    wishlist: true,
    reviews: true,
    notifications: true,
    checkout: true,
  },
  homeSections: ["hero", "categories", "mood", "newArrivals"],
};

/** Active store configuration. Swap this binding to support multi-store. */
export const activeStore: StoreConfig = naseejStore;

export const storeConfigs: Record<string, StoreConfig> = {
  [naseejStore.id]: naseejStore,
};