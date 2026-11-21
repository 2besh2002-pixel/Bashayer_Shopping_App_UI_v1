/**
 * API endpoint configuration.
 *
 * The real contracts will be provided by the store Middleware API. Nothing here
 * is an invented Salla endpoint — these are placeholder paths the future
 * repository layer will target once the backend contract is known. Do not wire
 * screens directly to these values.
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  catalog: {
    products: "/products",
    product: (id: string | number) => `/products/${id}`,
    categories: "/categories",
    search: "/products/search",
  },
  cart: {
    root: "/cart",
    item: (id: string) => `/cart/items/${id}`,
  },
  wishlist: {
    root: "/wishlist",
    item: (id: string | number) => `/wishlist/${id}`,
  },
  checkout: {
    shippingMethods: "/checkout/shipping-methods",
    paymentMethods: "/checkout/payment-methods",
    orders: "/orders",
  },
  orders: {
    list: "/orders",
    detail: (id: string) => `/orders/${id}`,
  },
  currencies: {
    rates: "/currencies/rates",
  },
} as const;