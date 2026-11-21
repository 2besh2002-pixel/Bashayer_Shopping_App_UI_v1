import type { Address, Notification, Order } from "@/src/types";
import { PRODUCTS } from "@/src/data/products";

/** Demo guest cart is empty; authenticated demo starts from these seeds. */
export const SEED_ADDRESSES: Address[] = [
  {
    id: "addr-home",
    label: { ar: "المنزل", en: "Home" },
    recipient: "نورة العتيبي",
    city: { ar: "الرياض", en: "Riyadh" },
    line: { ar: "شارع توضيحي، حي نموذجي", en: "Illustrative street, sample district" },
    isDefault: true,
  },
];

/**
 * A clearly-marked demo order so the Orders screen is never empty on first run.
 * Not a real order — purely illustrative local data.
 */
export const SEED_ORDERS: Order[] = [
  {
    id: "NSJ-0001",
    createdAt: "2025-10-12T10:00:00.000Z",
    status: "processing",
    lines: [
      {
        productId: 1,
        name: PRODUCTS[0].name,
        image: PRODUCTS[0].images[0],
        colorName: PRODUCTS[0].colors[0].name,
        sizeLabel: "M",
        quantity: 1,
        unitPrice: PRODUCTS[0].price,
      },
      {
        productId: 2,
        name: PRODUCTS[1].name,
        image: PRODUCTS[1].images[0],
        colorName: PRODUCTS[1].colors[0].name,
        sizeLabel: "O/S",
        quantity: 1,
        unitPrice: PRODUCTS[1].price,
      },
    ],
    subtotal: PRODUCTS[0].price + PRODUCTS[1].price,
    deliveryFee: 0,
    discount: 0,
    total: PRODUCTS[0].price + PRODUCTS[1].price,
    currencyAtCheckout: "SAR",
    isDemo: true,
  },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: "box",
    title: { ar: "تحديث على طلبكِ", en: "Your order has an update" },
    body: {
      ar: "اطّلعي على آخر حالة للطلب من صفحة التتبّع.",
      en: "See the latest status on the tracking page.",
    },
    time: { ar: "منذ ساعتين", en: "2h ago" },
    read: false,
  },
  {
    id: "n2",
    icon: "heart",
    title: { ar: "قطعة من مفضّلاتكِ متاحة", en: "A wishlist item is available" },
    body: {
      ar: "عادت القطعة التي حفظتِها إلى المخزون.",
      en: "An item you saved is back in stock.",
    },
    time: { ar: "أمس", en: "Yesterday" },
    read: true,
  },
  {
    id: "n3",
    icon: "bell",
    title: { ar: "اكتشفي تحرير الموسم", en: "Discover the season edit" },
    body: { ar: "اختيارات جديدة وصلت إلى نسيج.", en: "New selections have arrived at NASEEJ." },
    time: { ar: "منذ ٣ أيام", en: "3d ago" },
    read: true,
  },
];