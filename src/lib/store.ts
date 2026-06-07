import { promises as fs } from "fs";
import path from "path";

type SavedState = Record<string, string[]>;

const dataDir = path.join(process.cwd(), "data");
const savedFile = path.join(dataDir, "saved.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(savedFile);
  } catch {
    await fs.writeFile(savedFile, JSON.stringify({}, null, 2), "utf-8");
  }
}

export async function readSavedState(): Promise<SavedState> {
  await ensureStore();
  const raw = await fs.readFile(savedFile, "utf-8");
  return JSON.parse(raw) as SavedState;
}

export async function writeSavedState(nextState: SavedState) {
  await ensureStore();
  await fs.writeFile(savedFile, JSON.stringify(nextState, null, 2), "utf-8");
}

export async function getSavedForSession(sessionId: string) {
  const state = await readSavedState();
  return state[sessionId] ?? [];
}

export async function toggleSavedCollege(sessionId: string, slug: string) {
  const state = await readSavedState();
  const current = new Set(state[sessionId] ?? []);

  if (current.has(slug)) current.delete(slug);
  else current.add(slug);

  state[sessionId] = Array.from(current);
  await writeSavedState(state);
  return state[sessionId];
}
