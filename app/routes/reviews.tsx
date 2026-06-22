import { useState } from "react";
import { useReviews } from "../lib/useReviews";
import styles from "./reviews.module.css";

const AUTHORS = ["Francis", "Julia"];

export function meta() {
  return [{ title: "Trip Reviews" }];
}

export default function ReviewsPage() {
  const { reviews, loaded, addReview } = useReviews();
  const [author, setAuthor] = useState(AUTHORS[0]);
  const [place, setPlace] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!place.trim() || !body.trim()) return;
    setSubmitting(true);
    const ok = await addReview(author, place, body);
    setSubmitting(false);
    if (ok) {
      setPlace("");
      setBody("");
    }
  }

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>The Trip</p>
      <h1 className={styles.title}>Reflecting back</h1>
      <p className={styles.subtitle}>
        I hope this first anniversary trip was memorable. I am writing this in advance but I already know we had the
        best time. Thank you again for being the best wife in the whole world. I love you so much.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.authorPicker}>
          {AUTHORS.map((name) => (
            <button
              key={name}
              type="button"
              className={author === name ? `${styles.authorOption} ${styles.authorOptionSelected}` : styles.authorOption}
              onClick={() => setAuthor(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Place or activity (e.g. Jean-Talon Market)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          maxLength={2000}
        />
        <textarea
          className={styles.textarea}
          placeholder="What did you think?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
        />
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "Posting…" : "Post Review"}
        </button>
      </form>

      <div className={styles.list}>
        {loaded && reviews.length === 0 && <p className={styles.empty}>No reviews yet — be the first!</p>}
        {reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <p className={styles.reviewPlace}>{review.place}</p>
            <p className={styles.reviewMeta}>
              {review.author} · {new Date(review.created_at).toLocaleDateString()}
            </p>
            <p className={styles.reviewBody}>{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
