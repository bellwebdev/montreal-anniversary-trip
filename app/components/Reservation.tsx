import { useState } from "react";
import type { Reservation as ReservationData } from "../data/itinerary";
import { RatingBadge } from "./RatingBadge";
import styles from "./Reservation.module.css";

export function Reservation({ reservation }: { reservation: ReservationData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.badge}>Reservation Confirmed</span>
        <h3 className={styles.venue}>{reservation.venue}</h3>
        {reservation.time && <span className={styles.time}>{reservation.time}</span>}
        {reservation.rating && <RatingBadge rating={reservation.rating} />}
      </div>
      {reservation.note && <p className={styles.note}>{reservation.note}</p>}
      <div className={styles.actions}>
        {reservation.mapQuery && (
          <a
            className={styles.actionLink}
            href={`https://maps.apple.com/?q=${encodeURIComponent(reservation.mapQuery)}`}
            target="_blank"
            rel="noreferrer"
          >
            Get Directions →
          </a>
        )}
        {reservation.menu && (
          <button type="button" className={styles.actionButton} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? "Hide Menu" : "View Menu (Translated)"}
          </button>
        )}
      </div>
      {menuOpen && reservation.menu && (
        <div className={styles.menu}>
          {reservation.menu.map((section) => (
            <div key={section.section}>
              <h4 className={styles.menuSectionTitle}>{section.section}</h4>
              <ul className={styles.menuItems}>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className={styles.menuItemRow}>
                      <span className={styles.menuItemName}>{item.name}</span>
                      {item.price && <span className={styles.menuItemPrice}>{item.price}</span>}
                    </div>
                    {item.original && <span className={styles.menuItemOriginal}>{item.original}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
