import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Address, Notification, Order } from "@/src/types";
import type { AddressRepository, NotificationRepository, OrderRepository } from "@/src/repositories/types";
import { SEED_ADDRESSES, SEED_NOTIFICATIONS, SEED_ORDERS } from "@/src/data/mock";

const ORDERS_KEY = "naseej:orders";
const ADDRESSES_KEY = "naseej:addresses";

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence failure should not crash the checkout demo.
  }
}

export const mockOrderRepository: OrderRepository = {
  async list() {
    return readJson<Order[]>(ORDERS_KEY, SEED_ORDERS);
  },
  async get(id) {
    const orders = await readJson<Order[]>(ORDERS_KEY, SEED_ORDERS);
    return orders.find((o) => o.id === id);
  },
  async create(order) {
    const orders = await readJson<Order[]>(ORDERS_KEY, SEED_ORDERS);
    const next = [order, ...orders.filter((o) => o.id !== order.id)];
    await writeJson(ORDERS_KEY, next);
    return order;
  },
};

export const mockAddressRepository: AddressRepository = {
  async list() {
    return readJson<Address[]>(ADDRESSES_KEY, SEED_ADDRESSES);
  },
  async add(address) {
    const current = await readJson<Address[]>(ADDRESSES_KEY, SEED_ADDRESSES);
    const next = [...current, address];
    await writeJson(ADDRESSES_KEY, next);
    return next;
  },
};

export const mockNotificationRepository: NotificationRepository = {
  async list() {
    return SEED_NOTIFICATIONS;
  },
};