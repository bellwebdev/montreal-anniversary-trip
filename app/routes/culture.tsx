import type { Route } from "./+types/culture";
import { finalNotes, finalQuote, flexibilityNotes, foodIdentity } from "../data/itinerary";
import styles from "./culture.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Food & Culture — Montréal Anniversary Trip" }];
}

export default function Culture() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Food Identity of Montréal</h1>
      <p className={styles.intro}>{foodIdentity.intro}</p>

      <div className={styles.influences}>
        {foodIdentity.influences.map((influence) => (
          <div key={influence.title} className={styles.influenceCard}>
            <h2 className={styles.influenceTitle}>{influence.title}</h2>
            <ul className={styles.influencePoints}>
              {influence.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.closing}>{foodIdentity.closing}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Flexibility, by Design</h2>
        <ul className={styles.notesList}>
          {flexibilityNotes.map((note) => (
            <li key={note} className={styles.notesItem}>
              <span className={styles.dot} />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>This Trip Is Designed To</h2>
        <ul className={styles.notesList}>
          {finalNotes.map((note) => (
            <li key={note} className={styles.notesItem}>
              <span className={styles.dot} />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className={styles.quote}>{finalQuote}</p>
    </div>
  );
}
