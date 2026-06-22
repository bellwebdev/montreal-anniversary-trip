/// <reference types="@cloudflare/workers-types" />

interface Env {
  REVIEWS_DB: D1Database;
}

const MAX_FIELD_LENGTH = 2000;

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.REVIEWS_DB.prepare(
    "SELECT id, author, place, body, created_at FROM reviews ORDER BY created_at DESC",
  ).all();
  return Response.json(results);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => null);
  const author = (body as { author?: unknown } | null)?.author;
  const place = (body as { place?: unknown } | null)?.place;
  const text = (body as { body?: unknown } | null)?.body;

  if (
    typeof author !== "string" ||
    typeof place !== "string" ||
    typeof text !== "string" ||
    !author.trim() ||
    !place.trim() ||
    !text.trim() ||
    author.length > MAX_FIELD_LENGTH ||
    place.length > MAX_FIELD_LENGTH ||
    text.length > MAX_FIELD_LENGTH
  ) {
    return new Response("Bad Request", { status: 400 });
  }

  const result = await env.REVIEWS_DB.prepare(
    "INSERT INTO reviews (author, place, body) VALUES (?, ?, ?) RETURNING id, author, place, body, created_at",
  )
    .bind(author.trim(), place.trim(), text.trim())
    .first();

  return Response.json(result);
};
