import { useEffect, useState } from "react";

export type Review = {
  id: number;
  author: string;
  place: string;
  body: string;
  created_at: string;
};

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok || cancelled) return;
        const data: Review[] = await res.json();
        if (!cancelled) setReviews(data);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function addReview(author: string, place: string, body: string) {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, place, body }),
    });
    if (!res.ok) return false;
    const created: Review = await res.json();
    setReviews((prev) => [created, ...prev]);
    return true;
  }

  return { reviews, loaded, addReview };
}
