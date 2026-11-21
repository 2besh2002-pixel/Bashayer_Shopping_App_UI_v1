import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  ids: number[];
  toggle: (productId: number) => void;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
  merge: (ids: number[]) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
      add: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId) ? state.ids : [...state.ids, productId],
        })),
      remove: (productId) =>
        set((state) => ({ ids: state.ids.filter((id) => id !== productId) })),
      has: (productId) => get().ids.includes(productId),
      merge: (incoming) =>
        set((state) => ({ ids: Array.from(new Set([...state.ids, ...incoming])) })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "naseej:wishlist",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);