import type { Category, Lang, Product } from "@/src/types";
import type { CatalogRepository } from "@/src/repositories/types";
import { CATEGORIES, PRODUCTS, getProductById } from "@/src/data/products";
import { pick } from "@/src/utils/format";

function matches(product: Product, query: string, lang: Lang): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const name = pick(product.name, lang).toLowerCase();
  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  const categoryName = category ? pick(category.name, lang).toLowerCase() : "";
  return name.includes(q) || categoryName.includes(q);
}

export const mockCatalogRepository: CatalogRepository = {
  async listProducts() {
    return PRODUCTS;
  },
  async getProduct(id) {
    return getProductById(id);
  },
  async listCategories() {
    return CATEGORIES;
  },
  async search(query, lang) {
    return PRODUCTS.filter((p) => matches(p, query, lang));
  },
};