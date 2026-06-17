import { NavLink, Outlet } from "react-router";
import { days } from "../data/itinerary";
import styles from "./Layout.module.css";

function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" end className={linkClass}>
            Overview
          </NavLink>
          {days.map((day) => (
            <NavLink key={day.id} to={`/day/${day.id}`} className={linkClass}>
              Day {day.id}
              {day.isAnniversary ? " ♥" : ""}
            </NavLink>
          ))}
          <NavLink to="/culture" className={linkClass}>
            Food &amp; Culture
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        <p>Made with love for our Montréal anniversary trip.</p>
      </footer>
    </>
  );
}
