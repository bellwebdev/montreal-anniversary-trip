import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { days, isDayLocked } from "../data/itinerary";
import styles from "./Layout.module.css";

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.bar}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕ Close" : "☰ Menu"}
          </button>
          <nav className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
            <NavLink to="/" end className={linkClass}>
              Overview
            </NavLink>
            <NavLink to="/culture" className={linkClass}>
              Food &amp; Culture
            </NavLink>
            {days.map((day) =>
              isDayLocked(day) ? (
                <span
                  key={day.id}
                  className={`${styles.link} ${styles.linkLocked}`}
                  aria-disabled="true"
                  title={`Unlocks ${day.date}`}
                >
                  Day {day.id}
                  {day.isAnniversary ? " ♥" : ""}
                </span>
              ) : (
                <NavLink key={day.id} to={`/day/${day.id}`} className={linkClass}>
                  Day {day.id}
                  {day.isAnniversary ? " ♥" : ""}
                </NavLink>
              ),
            )}
            <NavLink to="/reviews" className={linkClass}>
              Reviews
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        <p>Made with love for our Montréal anniversary trip.</p>
      </footer>
    </>
  );
}
