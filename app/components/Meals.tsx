import { useState } from "react";
import type { MealSlot } from "../data/itinerary";
import { ChoicePicker } from "./ChoicePicker";
import { Reservation } from "./Reservation";
import { RatingBadge } from "./RatingBadge";
import styles from "./Meals.module.css";

export function Meals({ meals }: { meals: MealSlot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = meals[activeIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {meals.map((meal, index) => (
          <button
            key={meal.period}
            type="button"
            className={index === activeIndex ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => setActiveIndex(index)}
          >
            {meal.period}
          </button>
        ))}
      </div>
      <div className={styles.panel}>
        {active.anchor && !active.reservation && (
          <span className={styles.anchorBadge}>Anchor Experience</span>
        )}
        {active.reservation && <Reservation reservation={active.reservation} />}
        {active.choice && <ChoicePicker choice={active.choice} />}
        {active.venue && (
          <div className={styles.venue}>
            <p className={styles.venueName}>
              <strong>{active.venue.name}</strong>
              {active.venue.rating && <RatingBadge rating={active.venue.rating} />}
            </p>
            {active.venue.description && <p className={styles.note}>{active.venue.description}</p>}
            {active.venue.mapQuery && (
              <a
                className={styles.venueLink}
                href={`https://maps.apple.com/?q=${encodeURIComponent(active.venue.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions →
              </a>
            )}
          </div>
        )}
        {active.note && <p className={styles.note}>{active.note}</p>}
      </div>
    </div>
  );
}
