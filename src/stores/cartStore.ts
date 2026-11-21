import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CartItem, Product } from "@/src/types";
import { variantLineId } from "@/src/utils/format";

export const MAX_QUANTITY = 10;
export const MIN_QUANTITY = 1;

export interface AddOptions {
  colorId?: string | null;
  sizeId?: string | null;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  /** Add a product variant. Same variant increments quantity instead of duplicating. */
  addItem: (product: Product, options?: AddOptions) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Merge another cart (used when restoring/merging guest data) with dedupe. */
  merge: (items: CartItem[]) => void;
}

function clampQuantity(q: number): number {
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.round(q)));
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, options = {}) => {
        const colorId = options.colorId ?? null;
        const sizeId = options.sizeId ?? null;
        const id = variantLineId(product.id, colorId, sizeId);
        const quantity = clampQuantity(options.quantity ?? 1);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: clampQuantity(i.quantity + quantity) } : i,
              ),
            };
          }
          return { items: [...state.items, { id, productId: product.id, colorId, sizeId, quantity }] };
        });
      },
      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: clampQuantity(i.quantity + 1) } : i,
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          // Remove the line entirely when it would drop below the minimum.
          items:
            state.items
              .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
              .filter((i) => i.quantity >= MIN_QUANTITY),
        })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: clampQuantity(quantity) } : i))
            .filter((i) => i.quantity >= MIN_QUANTITY),
        })),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      merge: (incoming) =>
        set((state) => {
          const map = new Map(state.items.map((i) => [i.id, i]));
          for (const item of incoming) {
            const existing = map.get(item.id);
            if (existing) {
              map.set(item.id, {
                ...existing,
                quantity: clampQuantity(existing.quantity + item.quantity),
              });
            } else {
              map.set(item.id, item);
            }
          }
          return { items: Array.from(map.values()) };
        }),
    }),
    {
      name: "naseej:cart",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);

/** Selector helpers kept outside the store so components subscribe narrowly. */
export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);