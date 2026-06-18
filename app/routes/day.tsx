import { Link, useParams } from "react-router";
import type { Route } from "./+types/day";
import { days } from "../data/itinerary";
import { ActivityCard } from "../components/ActivityCard";
import { Meals } from "../components/Meals";
import styles from "./day.module.css";

export function meta({ params }: Route.MetaArgs) {
  const day = days.find((d) => d.id === Number(params.id));
  return [{ title: day ? `Day ${day.id} — ${day.title}` : "Day not found" }];
}

export default function DayPage() {
  const { id } = useParams();
  const day = days.find((d) => d.id === Number(id));

  if (!day) {
    return (
      <div className={styles.notFound}>
        <h1>Day not found</h1>
        <Link to="/">Back to overview</Link>
      </div>
    );
  }

  const index = days.findIndex((d) => d.id === day.id);
  const prev = days[index - 1];
  const next = days[index + 1];

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>{day.date}</p>
      <h1 className={styles.title}>{day.title}</h1>
      <p className={styles.subtitle}>{day.subtitle}</p>
      {day.isAnniversary && <span className={styles.anniversaryBadge}>♥ Anniversary Day</span>}
      {day.vibe && <p className={styles.vibe}>{day.vibe}</p>}

      {day.meals && day.meals.length > 0 && (
        <div className={styles.meals}>
          <h2 className={styles.mealsHeading}>Today's Meals</h2>
          <Meals key={day.id} meals={day.meals} />
        </div>
      )}

      <div className={styles.sections}>
        {day.sections.map((section) => (
          <ActivityCard key={section.id} section={section} />
        ))}
      </div>

      <nav className={styles.dayNav}>
        {prev ? (
          <Link to={`/day/${prev.id}`} className={styles.dayNavLink}>
            ← Day {prev.id}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/day/${next.id}`} className={styles.dayNavLink}>
            Day {next.id} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
