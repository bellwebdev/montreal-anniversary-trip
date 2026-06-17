import { useChoice } from "../lib/useChoice";
import type { Choice } from "../data/itinerary";
import styles from "./ChoicePicker.module.css";

export function ChoicePicker({ choice }: { choice: Choice }) {
  const { value, select, hydrated } = useChoice(choice.id);

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
              {option.description && (
                <span className={styles.optionDescription}>— {option.description}</span>
              )}
            </button>
          );
        })}
      </div>
      {hydrated && value && <p className={styles.savedNote}>Saved on this device — change anytime.</p>}
    </div>
  );
}
