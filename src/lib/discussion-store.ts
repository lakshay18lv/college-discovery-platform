import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type DiscussionAnswer = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type DiscussionPost = {
  id: string;
  collegeSlug?: string;
  title: string;
  body: string;
  authorName: string;
  answers: DiscussionAnswer[];
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const discussionFile = path.join(dataDir, "discussions.json");

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(discussionFile);
  } catch {
    const seed: DiscussionPost[] = [
      {
        id: randomUUID(),
        collegeSlug: "iit-delhi",
        title: "IIT Delhi vs DTU for CSE placements?",
        body: "I have a strong JEE Main rank and want to understand which option gives better software outcomes and peer network.",
        authorName: "Admin",
        answers: [
          {
            id: randomUUID(),
            authorName: "Mentor",
            body: "If you can get IIT Delhi, it generally wins on peer quality and long-term brand; DTU can still be excellent if you want a stronger Delhi ecosystem at lower fees.",
            createdAt: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];
    await fs.writeFile(discussionFile, JSON.stringify(seed, null, 2), "utf-8");
  }
}

export async function readDiscussions() {
  await ensureStore();
  const raw = await fs.readFile(discussionFile, "utf-8");
  return JSON.parse(raw) as DiscussionPost[];
}

async function writeDiscussions(items: DiscussionPost[]) {
  await ensureStore();
  await fs.writeFile(discussionFile, JSON.stringify(items, null, 2), "utf-8");
}

export async function createDiscussion(input: {
  title: string;
  body: string;
  authorName: string;
  collegeSlug?: string;
}) {
  const discussions = await readDiscussions();
  const post: DiscussionPost = {
    id: randomUUID(),
    title: input.title.trim(),
    body: input.body.trim(),
    authorName: input.authorName.trim(),
    collegeSlug: input.collegeSlug?.trim() || undefined,
    answers: [],
    createdAt: new Date().toISOString()
  };
  discussions.unshift(post);
  await writeDiscussions(discussions);
  return post;
}

export async function addAnswer(input: { postId: string; body: string; authorName: string }) {
  const discussions = await readDiscussions();
  const post = discussions.find((item) => item.id === input.postId);
  if (!post) {
    throw new Error("Discussion not found");
  }

  const answer: DiscussionAnswer = {
    id: randomUUID(),
    authorName: input.authorName.trim(),
    body: input.body.trim(),
    createdAt: new Date().toISOString()
  };

  post.answers.push(answer);
  await writeDiscussions(discussions);
  return answer;
}
