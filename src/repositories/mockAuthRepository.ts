import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import type { User } from "@/src/types";
import type { AuthRepository } from "@/src/repositories/types";

/**
 * Local demonstration authentication.
 *
 * This is NOT production authentication: demo passwords are held only in memory
 * and there is no server-side identity verification. Never present this
 * as secure. A real implementation would call the store Middleware auth endpoints
 * (see ENDPOINTS.auth) and keep the returned access token in SecureStore only.
 */

const USERS_KEY = "naseej:users";
const TOKEN_KEY = "naseej:session";

interface StoredUser extends User {
  password?: never;
}

const DEMO_USER: StoredUser = {
  id: "demo-user",
  name: "Noura Alotaibi",
  email: "test@naseej.com",
};

// Passwords exist only in memory for this demo and are never persisted.
const registeredPasswords = new Map<string, string>();

async function readUsers(): Promise<StoredUser[]> {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    if (!raw) return [DEMO_USER];
    const parsed = (JSON.parse(raw) as Partial<StoredUser>[])
      .filter((u): u is StoredUser => Boolean(u.id && u.name && u.email))
      .map((u) => ({ id: u.id!, name: u.name!, email: u.email! }));
    // Always keep the seeded demo account available.
    const users = parsed.some((u) => u.email === DEMO_USER.email)
      ? parsed
      : [DEMO_USER, ...parsed];
    await writeUsers(users);
    return users;
  } catch {
    return [DEMO_USER];
  }
}

async function writeUsers(users: StoredUser[]): Promise<void> {
  const publicUsers = users.map(({ id, name, email }) => ({ id, name, email }));
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(publicUsers));
}

function toPublic(user: StoredUser): User {
  return { id: user.id, name: user.name, email: user.email };
}

async function persistToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch {
    // SecureStore is unavailable on some platforms (e.g. web preview) — non-fatal.
  }
}

export const mockAuthRepository: AuthRepository = {
  async login(email, password) {
    const users = await readUsers();
    const normalized = email.trim().toLowerCase();
    const match = users.find((u) => u.email.toLowerCase() === normalized);
    if (match && !registeredPasswords.has(normalized)) {
      return { ok: false, error: "errInvalidCredentials" };
    }
    if (match && registeredPasswords.get(normalized) !== password) {
      return { ok: false, error: "errInvalidCredentials" };
    }
    if (!match) return { ok: false, error: "errInvalidCredentials" };
    const token = `demo-token-${match.id}`;
    await persistToken(token);
    return { ok: true, data: { user: toPublic(match), token } };
  },

  async register(name, email, password) {
    const users = await readUsers();
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalized)) {
      return { ok: false, error: "errEmailExists" };
    }
    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalized,
    };
    await writeUsers([...users, user]);
    registeredPasswords.set(normalized, password);
    const token = `demo-token-${user.id}`;
    await persistToken(token);
    return { ok: true, data: { user: toPublic(user), token } };
  },

  async logout(token) {
    if (token) {
      try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      } catch {
        // ignore
      }
    }
  },

  async restoreSession() {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) return null;
      const users = await readUsers();
      const id = token.replace("demo-token-", "");
      const match = users.find((u) => u.id === id);
      return match ? { user: toPublic(match), token } : null;
    } catch {
      return null;
    }
  },
};