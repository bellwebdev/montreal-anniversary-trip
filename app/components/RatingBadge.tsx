import type { Rating } from "../data/itinerary";
import styles from "./RatingBadge.module.css";

export function RatingBadge({ rating }: { rating: Rating }) {
  return (
    <span className={styles.rating}>
      ★ {rating.score.toFixed(1)}
      {rating.count ? ` (${rating.count})` : ""}
    </span>
  );
}
