import { useEffect, useState } from "react";

const STORAGE_PREFIX = "montreal-trip:";
const POLL_INTERVAL_MS = 8000;

export function useChoice(key: string) {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const [value, setValue] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Show the local pick instantly, then sync against the shared KV store
    // (via the /api/choices Pages Function) so both of us see the same
    // answer, and keep polling so the other person's pick shows up live.
    setValue(localStorage.getItem(storageKey));
    setHydrated(true);

    async function sync() {
      try {
        const res = await fetch("/api/choices");
        if (!res.ok) return;
        const data: Record<string, string | null> = await res.json();
        if (cancelled) return;
        const remote = data[key];
        if (remote) {
          setValue(remote);
          localStorage.setItem(storageKey, remote);
        }
      } catch {
        // Offline, or running under plain `vite dev` without Pages Functions —
        // the local value stands until the next successful sync.
      }
    }

    sync();
    const interval = setInterval(sync, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [key, storageKey]);

  async function select(id: string) {
    setValue(id);
    localStorage.setItem(storageKey, id);
    try {
      await fetch("/api/choices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: id }),
      });
    } catch {
      // Will retry on the next poll or next visit.
    }
  }

  return { value, select, hydrated };
}
