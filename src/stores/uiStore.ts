import { create } from "zustand";

interface ToastState {
  toast: { id: number; message: string } | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

let counter = 0;

/** Lightweight global toast (cart/wishlist confirmations, etc.). */
export const useUiStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message) => {
    counter += 1;
    set({ toast: { id: counter, message } });
  },
  clearToast: () => set({ toast: null }),
}));