import { Link } from "react-router";
import type { Route } from "./+types/home";
import { anchorExperiences, corePrinciples, days, tripDates } from "../data/itinerary";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Montréal Anniversary Trip" },
    { name: "description", content: "Our interactive Montréal anniversary itinerary." },
  ];
}

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>An Anniversary Trip</p>
        <h1 className={styles.title}>Montréal</h1>
        <p className={styles.dates}>{tripDates}</p>
        <p className={styles.tagline}>
          A relaxed, walkable, experience-focused trip — neighborhood exploration, food culture,
          nature, and a slow-paced anniversary day.
        </p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Principles</h2>
        <ul className={styles.principles}>
          {corePrinciples.map((principle) => (
            <li key={principle} className={styles.principle}>
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Anchor Experiences</h2>
        <div className={styles.anchorList}>
          {anchorExperiences.map((experience) => (
            <span key={experience} className={styles.anchorPill}>
              {experience}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Days</h2>
        <div className={styles.dayGrid}>
          {days.map((day) => (
            <Link
              key={day.id}
              to={`/day/${day.id}`}
              className={day.isAnniversary ? `${styles.dayCard} ${styles.dayCardAnniversary}` : styles.dayCard}
            >
              <p className={styles.dayLabel}>
                Day {day.id} — {day.date}
              </p>
              <p className={styles.dayCardTitle}>{day.title}</p>
              <p className={styles.dayCardSubtitle}>
                {day.subtitle}
                {day.isAnniversary ? " ♥" : ""}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
