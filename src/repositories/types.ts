import type {
  Address,
  Category,
  Lang,
  Notification,
  Order,
  Product,
  User,
} from "@/src/types";
import type { TranslationKey } from "@/src/i18n/translations";

/** Result shape shared by async local repositories. */
export type RepoResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: TranslationKey };

export interface AuthRepository {
  /** Returns the authenticated user + a session token on success. */
  login(email: string, password: string): Promise<RepoResult<{ user: User; token: string }>>;
  register(
    name: string,
    email: string,
    password: string,
  ): Promise<RepoResult<{ user: User; token: string }>>;
  logout(token: string | null): Promise<void>;
  /** Restore a persisted demo session, if any. */
  restoreSession(): Promise<{ user: User; token: string } | null>;
}

export interface CatalogRepository {
  listProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  listCategories(): Promise<Category[]>;
  search(query: string, lang: Lang): Promise<Product[]>;
}

export interface OrderRepository {
  list(): Promise<Order[]>;
  get(id: string): Promise<Order | undefined>;
  /** Locally create a demonstration order from a checkout payload. */
  create(order: Order): Promise<Order>;
}

export interface AddressRepository {
  list(): Promise<Address[]>;
  add(address: Address): Promise<Address[]>;
}

export interface NotificationRepository {
  list(): Promise<Notification[]>;
}