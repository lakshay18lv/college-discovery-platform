"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Badge } from "@/components/ui";
import { colleges } from "@/lib/data";

type DiscussionPost = {
  id: string;
  collegeSlug?: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: string;
  answers: Array<{
    id: string;
    authorName: string;
    body: string;
    createdAt: string;
  }>;
};

export function DiscussionBoard() {
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [collegeSlug, setCollegeSlug] = useState("");
  const [answerDrafts, setAnswerDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/discussions");
      const data = await response.json();
      setPosts(data.items ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, collegeSlug })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to create discussion");
      return;
    }
    setPosts((current) => [data.item, ...current]);
    setTitle("");
    setBody("");
    setCollegeSlug("");
    setMessage("Discussion posted.");
  }

  async function answerPost(postId: string) {
    const draft = answerDrafts[postId]?.trim();
    if (!draft) return;
    const response = await fetch(`/api/discussions/${postId}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: draft })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to answer");
      return;
    }

    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, answers: [...post.answers, data.item] } : post
      )
    );
    setAnswerDrafts((current) => ({ ...current, [postId]: "" }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <Card>
        <form onSubmit={createPost} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Related college</label>
            <select
              value={collegeSlug}
              onChange={(event) => setCollegeSlug(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            >
              <option value="">General discussion</option>
              {colleges.map((college) => (
                <option key={college.slug} value={college.slug}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Question title"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={6}
            placeholder="Ask your question..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
          >
            Post question
          </button>
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          <p className="text-xs leading-5 text-slate-500">
            Tip: sign in first on the{" "}
            <Link href="/auth" className="font-semibold text-brand-700 underline">
              auth page
            </Link>{" "}
            if you want discussions and saved items to feel tied together.
          </p>
        </form>
      </Card>

      <div className="space-y-4">
        {loading ? <Card><p className="text-sm text-slate-600">Loading discussions...</p></Card> : null}
        {!loading && !posts.length ? (
          <Card>
            <p className="text-sm text-slate-600">No questions yet. Start the discussion.</p>
          </Card>
        ) : null}

        {posts.map((post) => {
          const college = post.collegeSlug ? colleges.find((item) => item.slug === post.collegeSlug) : null;
          return (
            <Card key={post.id} className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                  <p className="text-sm text-slate-500">
                    by {post.authorName} ·{" "}
                    {new Date(post.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                {college ? <Badge>{college.name}</Badge> : <Badge>General</Badge>}
              </div>
              <p className="text-sm leading-6 text-slate-600">{post.body}</p>

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <p className="text-sm font-semibold text-slate-900">
                  Answers ({post.answers.length})
                </p>
                {post.answers.map((answer) => (
                  <div key={answer.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{answer.authorName}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{answer.body}</p>
                  </div>
                ))}

                <div className="grid gap-2">
                  <textarea
                    value={answerDrafts[post.id] ?? ""}
                    onChange={(event) =>
                      setAnswerDrafts((current) => ({ ...current, [post.id]: event.target.value }))
                    }
                    rows={3}
                    placeholder="Write an answer..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => answerPost(post.id)}
                    className="w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
