/// <reference types="@cloudflare/workers-types" />

interface Env {
  CHOICES_KV: KVNamespace;
}

const ALLOWED_KEYS = [
  "day3-addon",
  "day1-dinner",
  "day2-breakfast",
  "day2-dinner",
  "day3-lunch",
  "day3-dinner",
  "day3-post-garden",
  "day4-breakfast",
  "day4-pre-dinner",
];

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const entries = await Promise.all(
    ALLOWED_KEYS.map(async (key) => [key, await env.CHOICES_KV.get(key)] as const),
  );
  return Response.json(Object.fromEntries(entries));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => null);
  const key = (body as { key?: unknown } | null)?.key;
  const value = (body as { value?: unknown } | null)?.value;

  if (typeof key !== "string" || typeof value !== "string" || !ALLOWED_KEYS.includes(key)) {
    return new Response("Bad Request", { status: 400 });
  }

  await env.CHOICES_KV.put(key, value);
  return Response.json({ ok: true });
};
