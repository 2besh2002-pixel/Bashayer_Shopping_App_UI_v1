/**
 * Repository registry.
 *
 * Screens depend on these interfaces, not on the mock implementations. To move
 * to a real backend, implement the same interfaces against the Middleware API
 * (using src/api/client.ts) and swap the bindings here — no screen changes
 * required.
 */
import type {
  AddressRepository,
  AuthRepository,
  CatalogRepository,
  NotificationRepository,
  OrderRepository,
} from "@/src/repositories/types";
import { mockAuthRepository } from "@/src/repositories/mockAuthRepository";
import { mockCatalogRepository } from "@/src/repositories/mockCatalogRepository";
import {
  mockAddressRepository,
  mockNotificationRepository,
  mockOrderRepository,
} from "@/src/repositories/mockCommerceRepositories";

export const repositories: {
  auth: AuthRepository;
  catalog: CatalogRepository;
  orders: OrderRepository;
  addresses: AddressRepository;
  notifications: NotificationRepository;
} = {
  auth: mockAuthRepository,
  catalog: mockCatalogRepository,
  orders: mockOrderRepository,
  addresses: mockAddressRepository,
  notifications: mockNotificationRepository,
};

export type {
  AddressRepository,
  AuthRepository,
  CatalogRepository,
  NotificationRepository,
  OrderRepository,
};