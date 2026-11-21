import { useMemo } from "react";

import { useCartStore } from "@/src/stores/cartStore";
import { getProductById } from "@/src/data/products";
import type { CartItem, Product } from "@/src/types";

export interface CartLine {
  item: CartItem;
  product: Product;
  /** Unit price in base currency (SAR). */
  unitPrice: number;
  /** Line total in base currency (SAR). */
  lineTotal: number;
}

export interface CartDetailed {
  lines: CartLine[];
  /** Sum of line totals in base currency (SAR). */
  subtotalSar: number;
  /** Total quantity across all lines. */
  count: number;
}

/**
 * Join cart items with catalogue data and compute base-currency totals.
 * Kept out of components so cart maths is unit-testable and reused by checkout.
 */
export function useCartDetailed(): CartDetailed {
  const items = useCartStore((s) => s.items);
  return useMemo(() => {
    const lines: CartLine[] = [];
    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) continue;
      lines.push({
        item,
        product,
        unitPrice: product.price,
        lineTotal: product.price * item.quantity,
      });
    }
    const subtotalSar = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const count = lines.reduce((sum, l) => sum + l.item.quantity, 0);
    return { lines, subtotalSar, count };
  }, [items]);
}