import { randomUUID, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type AuthState = {
  users: AuthUser[];
  sessions: Record<string, string>;
};

const dataDir = path.join(process.cwd(), "data");
const authFile = path.join(dataDir, "auth.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(authFile);
  } catch {
    await fs.writeFile(authFile, JSON.stringify({ users: [], sessions: {} }, null, 2), "utf-8");
  }
}

async function readState(): Promise<AuthState> {
  await ensureStore();
  const raw = await fs.readFile(authFile, "utf-8");
  return JSON.parse(raw) as AuthState;
}

async function writeState(state: AuthState) {
  await ensureStore();
  await fs.writeFile(authFile, JSON.stringify(state, null, 2), "utf-8");
}

export function hashPassword(password: string) {
  return createHash("sha256").update(`cdp:${password}`).digest("hex");
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const state = await readState();
  const email = input.email.trim().toLowerCase();
  const existing = state.users.find((user) => user.email === email);

  if (existing) {
    throw new Error("User already exists");
  }

  const user: AuthUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString()
  };

  state.users.push(user);
  await writeState(state);
  return user;
}

export async function verifyUser(email: string, password: string) {
  const state = await readState();
  const user = state.users.find((item) => item.email === email.trim().toLowerCase());
  if (!user) return null;
  if (user.passwordHash !== hashPassword(password)) return null;
  return user;
}

export async function createSession(userId: string) {
  const state = await readState();
  const token = randomUUID();
  state.sessions[token] = userId;
  await writeState(state);
  return token;
}

export async function deleteSession(token: string) {
  const state = await readState();
  delete state.sessions[token];
  await writeState(state);
}

export async function getUserFromSession(token: string | undefined | null) {
  if (!token) return null;
  const state = await readState();
  const userId = state.sessions[token];
  if (!userId) return null;
  return state.users.find((user) => user.id === userId) ?? null;
}

export async function getUserById(id: string) {
  const state = await readState();
  return state.users.find((user) => user.id === id) ?? null;
}
