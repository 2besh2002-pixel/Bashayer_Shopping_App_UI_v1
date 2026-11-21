/**
 * Shared domain models.
 *
 * Prices are always stored in the store base currency (SAR). Conversion to the
 * customer's selected currency happens at the presentation layer through the
 * centralized currency utility (see src/utils/currency.ts). These interfaces are
 * intentionally shaped so they can later map 1:1 to real backend / Middleware
 * API responses without touching the screens.
 */

export type Lang = "ar" | "en";

export type CurrencyCode = "SAR" | "AED" | "USD" | "EUR" | "GBP";

export type Localized<T = string> = Record<Lang, T>;

export interface ProductColor {
  id: string;
  name: Localized;
  /** Hex value used to render the colour swatch. */
  hex: string;
  /** Swatch may be shown but disabled when the variant is unavailable. */
  available: boolean;
}

export interface ProductSize {
  id: string;
  label: string;
  available: boolean;
}

export interface ProductMeasurementRow {
  size: string;
  /** Measurements are always stored in centimetres. */
  bust: number;
  waist: number;
  hips: number;
  length: number;
}

export interface Product {
  id: number;
  slug: string;
  name: Localized;
  /** Base price in SAR. */
  price: number;
  /** Original price in SAR when discounted. */
  compareAt?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  categoryId: string;
  badge?: Localized;
  description: Localized;
  colors: ProductColor[];
  sizes: ProductSize[];
  /** Optional size guide shown as readable text, never baked into an image. */
  measurements?: ProductMeasurementRow[];
  /** Free-text material/care note shown only when provided by real data. */
  materialNote?: Localized;
}

export interface Category {
  id: string;
  name: Localized;
  image: string;
}

export interface CategoryGroup {
  id: string;
  name: Localized;
  image: string;
  items: Localized[];
}

/** A single line in the shopping bag. Different variants are distinct lines. */
export interface CartItem {
  /** Stable identity for the variant line: `${productId}:${colorId}:${sizeId}`. */
  id: string;
  productId: number;
  colorId: string | null;
  sizeId: string | null;
  quantity: number;
}

export interface WishlistEntry {
  productId: number;
  addedAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Address {
  id: string;
  label: Localized;
  recipient: string;
  city: Localized;
  line: Localized;
  isDefault: boolean;
}

export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderLine {
  productId: number;
  name: Localized;
  image: string;
  colorName?: Localized;
  sizeLabel?: string;
  quantity: number;
  /** Unit price in SAR. */
  unitPrice: number;
}

export interface Order {
  id: string;
  /** ISO date string. */
  createdAt: string;
  status: OrderStatus;
  lines: OrderLine[];
  /** Totals in SAR. */
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currencyAtCheckout: CurrencyCode;
  /** Clearly marks locally generated demo orders. */
  isDemo: boolean;
}

export interface Notification {
  id: string;
  icon: "box" | "heart" | "bell";
  title: Localized;
  body: Localized;
  time: Localized;
  read: boolean;
}

export interface CurrencyDefinition {
  code: CurrencyCode;
  /** Symbol used for display. */
  symbol: string;
  name: Localized;
  /** Units of this currency per 1 SAR (local demonstration rates). */
  perSar: number;
}