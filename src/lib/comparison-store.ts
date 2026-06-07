import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type SavedComparison = {
  id: string;
  ownerKey: string;
  title: string;
  slugs: string[];
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const comparisonFile = path.join(dataDir, "comparisons.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(comparisonFile);
  } catch {
    await fs.writeFile(comparisonFile, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function readComparisons() {
  await ensureStore();
  const raw = await fs.readFile(comparisonFile, "utf-8");
  return JSON.parse(raw) as SavedComparison[];
}

async function writeComparisons(items: SavedComparison[]) {
  await ensureStore();
  await fs.writeFile(comparisonFile, JSON.stringify(items, null, 2), "utf-8");
}

export async function getComparisonsForOwner(ownerKey: string) {
  const items = await readComparisons();
  return items.filter((item) => item.ownerKey === ownerKey);
}

export async function saveComparison(input: {
  ownerKey: string;
  title: string;
  slugs: string[];
}) {
  const items = await readComparisons();
  const filteredSlugs = Array.from(new Set(input.slugs)).slice(0, 3);

  const comparison: SavedComparison = {
    id: randomUUID(),
    ownerKey: input.ownerKey,
    title: input.title.trim(),
    slugs: filteredSlugs,
    createdAt: new Date().toISOString()
  };

  items.unshift(comparison);
  await writeComparisons(items);
  return comparison;
}
