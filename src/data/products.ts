import type { Category, CategoryGroup, Product } from "@/src/types";

const img = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const CATEGORIES: Category[] = [
  { id: "dresses", name: { ar: "فساتين", en: "Dresses" }, image: img("photo-1496747611176-843222e1e57c", 400) },
  { id: "men", name: { ar: "رجالي", en: "Men" }, image: img("photo-1617137968427-85924c800a22", 400) },
  { id: "shoes", name: { ar: "أحذية", en: "Shoes" }, image: img("photo-1543163521-1bf539c55dd2", 400) },
  { id: "bags", name: { ar: "حقائب", en: "Bags" }, image: img("photo-1584917865442-de89df76afd3", 400) },
  { id: "accessories", name: { ar: "إكسسوارات", en: "Accessories" }, image: img("photo-1523779917675-b6ed3a42a561", 400) },
];

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "women",
    name: { ar: "نسائي", en: "Women" },
    image: CATEGORIES[0].image,
    items: [
      { ar: "فساتين", en: "Dresses" },
      { ar: "توبات وقمصان", en: "Tops & shirts" },
      { ar: "عبايات ومعاطف", en: "Abayas & coats" },
      { ar: "بناطيل وتنانير", en: "Trousers & skirts" },
    ],
  },
  {
    id: "men",
    name: { ar: "رجالي", en: "Men" },
    image: CATEGORIES[1].image,
    items: [
      { ar: "قمصان", en: "Shirts" },
      { ar: "تيشيرتات", en: "T-shirts" },
      { ar: "بناطيل", en: "Trousers" },
      { ar: "جاكيتات", en: "Jackets" },
    ],
  },
  {
    id: "shoes-bags",
    name: { ar: "الأحذية والحقائب", en: "Shoes & bags" },
    image: CATEGORIES[3].image,
    items: [
      { ar: "أحذية نسائية", en: "Women’s shoes" },
      { ar: "أحذية رجالية", en: "Men’s shoes" },
      { ar: "حقائب يد", en: "Handbags" },
      { ar: "حقائب ظهر", en: "Backpacks" },
    ],
  },
];

/** Static size sets reused across products. */
const CLOTHING_SIZES = (soldOut: string[] = []) =>
  ["XS", "S", "M", "L", "XL", "XXL"].map((label) => ({
    id: label.toLowerCase(),
    label,
    available: !soldOut.includes(label),
  }));

const SHOE_SIZES = (soldOut: number[] = []) =>
  [36, 37, 38, 39, 40, 41].map((n) => ({
    id: String(n),
    label: String(n),
    available: !soldOut.includes(n),
  }));

const ONE_SIZE = [{ id: "os", label: "O/S", available: true }];

const BURGUNDY = { id: "burgundy", name: { ar: "عنابي", en: "Burgundy" }, hex: "#632c36", available: true };
const IVORY = { id: "ivory", name: { ar: "عاجي", en: "Ivory" }, hex: "#e7dfd0", available: true };
const CHARCOAL = { id: "charcoal", name: { ar: "فحمي", en: "Charcoal" }, hex: "#1f2930", available: false };
const TAN = { id: "tan", name: { ar: "بيج", en: "Tan" }, hex: "#c8a97e", available: true };
const BLACK = { id: "black", name: { ar: "أسود", en: "Black" }, hex: "#1c1c1c", available: true };

/**
 * Local mock catalogue. Prices are in SAR (base currency).
 * Content is illustrative prototype data, NOT live store inventory.
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "laurene-pleated-dress",
    name: { ar: "فستان لورين بطيات ناعمة", en: "Laurène Pleated Dress" },
    price: 429,
    compareAt: 520,
    rating: 4.8,
    reviewCount: 164,
    images: [img("photo-1595777457583-95e059d581b8")],
    categoryId: "dresses",
    badge: { ar: "حصري", en: "Exclusive" },
    description: {
      ar: "فستان متوسط الطول بطيّات ناعمة وقصّة انسيابية، مناسب لإطلالات الموسم.",
      en: "A midi dress with soft pleats and a fluid silhouette, made for the season.",
    },
    colors: [BURGUNDY, IVORY, CHARCOAL],
    sizes: CLOTHING_SIZES(["XS"]),
    measurements: [
      { size: "S", bust: 84, waist: 68, hips: 92, length: 136 },
      { size: "M", bust: 89, waist: 73, hips: 97, length: 137 },
      { size: "L", bust: 95, waist: 79, hips: 103, length: 138 },
      { size: "XL", bust: 101, waist: 85, hips: 109, length: 139 },
    ],
    materialNote: {
      ar: "خامة: خليط بوليستر ناعم. العناية: غسيل دقيق بماء بارد.",
      en: "Material: soft polyester blend. Care: gentle cold wash.",
    },
  },
  {
    id: 2,
    slug: "cali-leather-bag",
    name: { ar: "حقيبة كالي الجلدية", en: "Cali Leather Bag" },
    price: 315,
    rating: 4.7,
    reviewCount: 92,
    images: [img("photo-1584917865442-de89df76afd3")],
    categoryId: "bags",
    badge: { ar: "جديد", en: "New" },
    description: {
      ar: "حقيبة كتف جلدية بمساحة عملية وتفاصيل معدنية هادئة.",
      en: "A leather shoulder bag with practical space and understated hardware.",
    },
    colors: [TAN, BLACK],
    sizes: ONE_SIZE,
  },
  {
    id: 3,
    slug: "tailored-wool-coat",
    name: { ar: "معطف صوف بقصة مستقيمة", en: "Tailored Wool Coat" },
    price: 690,
    compareAt: 820,
    rating: 4.9,
    reviewCount: 211,
    images: [img("photo-1539533113208-f6df8cc8b543")],
    categoryId: "dresses",
    badge: { ar: "الأكثر مبيعاً", en: "Best seller" },
    description: {
      ar: "معطف صوف بقصّة مستقيمة ولمسة نهائية أنيقة.",
      en: "A wool coat with a straight cut and a refined finish.",
    },
    colors: [IVORY, CHARCOAL],
    sizes: CLOTHING_SIZES(["XS", "XXL"]),
  },
  {
    id: 4,
    slug: "sculpted-leather-heel",
    name: { ar: "حذاء جلدي بكعب منحوت", en: "Sculpted Leather Heel" },
    price: 380,
    rating: 4.6,
    reviewCount: 58,
    images: [img("photo-1543163521-1bf539c55dd2")],
    categoryId: "shoes",
    badge: { ar: "وصل حديثاً", en: "Just in" },
    description: {
      ar: "حذاء بكعب منحوت وخطوط نظيفة لإطلالة مسائية.",
      en: "A sculpted heel with clean lines for evening looks.",
    },
    colors: [BURGUNDY, BLACK],
    sizes: SHOE_SIZES([36]),
  },
  {
    id: 5,
    slug: "linen-midi-dress",
    name: { ar: "فستان كتان ميدي", en: "Linen Midi Dress" },
    price: 350,
    rating: 4.5,
    reviewCount: 74,
    images: [img("photo-1515372039744-b8f02a3ae446")],
    categoryId: "dresses",
    description: {
      ar: "فستان كتان ميدي خفيف مناسب للنهار.",
      en: "A lightweight linen midi dress for daytime.",
    },
    colors: [IVORY, BURGUNDY],
    sizes: CLOTHING_SIZES(["XXL"]),
    measurements: [
      { size: "S", bust: 86, waist: 70, hips: 94, length: 120 },
      { size: "M", bust: 91, waist: 75, hips: 99, length: 121 },
      { size: "L", bust: 97, waist: 81, hips: 105, length: 122 },
    ],
  },
  {
    id: 6,
    slug: "silk-scarf",
    name: { ar: "وشاح حريري بنقشة", en: "Printed Silk Scarf" },
    price: 180,
    rating: 4.4,
    reviewCount: 33,
    images: [img("photo-1601924994987-69e26d50dc26")],
    categoryId: "accessories",
    badge: { ar: "جديد", en: "New" },
    description: {
      ar: "وشاح حريري بنقشة هادئة يضيف لمسة لونية.",
      en: "A silk scarf in a subtle print that adds a pop of colour.",
    },
    colors: [BURGUNDY, IVORY],
    sizes: ONE_SIZE,
  },
  {
    id: 7,
    slug: "leather-tote",
    name: { ar: "حقيبة توت الجلدية", en: "Leather Tote" },
    price: 520,
    rating: 4.8,
    reviewCount: 121,
    images: [img("photo-1590874103328-eac38a683ce7")],
    categoryId: "bags",
    description: {
      ar: "حقيبة توت جلدية واسعة تناسب الاستخدام اليومي.",
      en: "A roomy leather tote for everyday use.",
    },
    colors: [TAN, BLACK],
    sizes: ONE_SIZE,
  },
  {
    id: 8,
    slug: "cotton-shirt",
    name: { ar: "قميص قطني كلاسيكي", en: "Classic Cotton Shirt" },
    price: 240,
    rating: 4.3,
    reviewCount: 47,
    images: [img("photo-1596755094514-f87e34085b2c")],
    categoryId: "men",
    description: {
      ar: "قميص قطني بقصّة كلاسيكية مريحة.",
      en: "A comfortable cotton shirt with a classic cut.",
    },
    colors: [IVORY, CHARCOAL],
    sizes: CLOTHING_SIZES(["XS"]),
  },
  {
    id: 9,
    slug: "suede-loafers",
    name: { ar: "حذاء لوفر من الشاموا", en: "Suede Loafers" },
    price: 410,
    rating: 4.5,
    reviewCount: 66,
    images: [img("photo-1533867617858-e7b97e060509")],
    categoryId: "shoes",
    description: {
      ar: "حذاء لوفر من الشاموا بتفاصيل مريحة.",
      en: "Comfortable suede loafers with refined detailing.",
    },
    colors: [TAN, BLACK],
    sizes: SHOE_SIZES([41]),
  },
  {
    id: 10,
    slug: "knit-cardigan",
    name: { ar: "كارديغان محبوك", en: "Knit Cardigan" },
    price: 300,
    compareAt: 360,
    rating: 4.6,
    reviewCount: 88,
    images: [img("photo-1434389677669-e08b4cac3105")],
    categoryId: "dresses",
    badge: { ar: "الأكثر مبيعاً", en: "Best seller" },
    description: {
      ar: "كارديغان محبوك ناعم لطبقات الموسم.",
      en: "A soft knitted cardigan for seasonal layering.",
    },
    colors: [IVORY, BURGUNDY, CHARCOAL],
    sizes: CLOTHING_SIZES(["XXL"]),
  },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(id: number, categoryId: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== id && p.categoryId === categoryId)
    .concat(PRODUCTS.filter((p) => p.id !== id && p.categoryId !== categoryId))
    .slice(0, limit);
}