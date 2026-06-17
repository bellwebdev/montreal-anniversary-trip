import { useState } from "react";
import type { Section } from "../data/itinerary";
import { ChoicePicker } from "./ChoicePicker";
import styles from "./ActivityCard.module.css";

export function ActivityCard({ section }: { section: Section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.card}>
      <button type="button" className={styles.toggle} onClick={() => setOpen((o) => !o)}>
        <span className={styles.headingRow}>
          <span className={styles.heading}>{section.heading}</span>
          {section.anchor && <span className={styles.anchorBadge}>Anchor Experience</span>}
        </span>
        <svg
          className={open ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className={styles.body}>
          {section.note && <p className={styles.note}>{section.note}</p>}
          {section.items && (
            <ul className={styles.items}>
              {section.items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.dot} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {section.choice && <ChoicePicker choice={section.choice} />}
        </div>
      )}
    </div>
  );
}
