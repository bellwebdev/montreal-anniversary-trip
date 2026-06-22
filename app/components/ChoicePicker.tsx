import { useChoice } from "../lib/useChoice";
import type { Choice } from "../data/itinerary";
import { RatingBadge } from "./RatingBadge";
import styles from "./ChoicePicker.module.css";

export function ChoicePicker({ choice }: { choice: Choice }) {
  const { value, select, hydrated } = useChoice(choice.id);
  const selectedOption = hydrated ? choice.options.find((option) => option.id === value) : undefined;

  return (
    <div className={styles.wrapper}>
      <p className={styles.prompt}>{choice.prompt}</p>
      <div className={styles.options}>
        {choice.options.map((option) => {
          const selected = hydrated && value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => select(option.id)}
              className={selected ? `${styles.option} ${styles.optionSelected}` : styles.option}
            >
              {option.label}
              {option.rating && <RatingBadge rating={option.rating} />}
              {option.description && (
                <span className={styles.optionDescription}>— {option.description}</span>
              )}
            </button>
          );
        })}
      </div>
      {selectedOption && (
        <div className={styles.selectedInfo}>
          <p className={styles.savedNote}>Saved on this device — change anytime.</p>
          {selectedOption.mapQuery && (
            <a
              className={styles.directionsLink}
              href={`https://maps.apple.com/?q=${encodeURIComponent(selectedOption.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
