import { useState } from "react";
import type { MealSlot } from "../data/itinerary";
import { ChoicePicker } from "./ChoicePicker";
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
        {active.anchor && <span className={styles.anchorBadge}>Anchor Experience</span>}
        {active.choice && <ChoicePicker choice={active.choice} />}
        {active.note && <p className={styles.note}>{active.note}</p>}
      </div>
    </div>
  );
}
