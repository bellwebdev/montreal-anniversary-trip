import type { Route } from "./+types/home";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "To My Wife Julia" },
    { name: "description", content: "A one-year anniversary tribute to my wife, Julia." },
  ];
}

export default function Home() {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>To My Amazing Wife Julia</h1>

      <img className={styles.photo} src="/images/wedding-photo.webp" alt="Francis and Julia on their wedding day" />

      <p className={styles.paragraph}>
        I cannot believe it has been a year since we became husband and wife. I am so incredibly
        blessed to be on this journey called life with you. I am eternally grateful I get to wake
        up next to you every morning. This year went so fast because it has been so crazy. We've
        done so many huge life events over the past 365 days.
      </p>

      <img className={styles.photo} src="/images/honeymoon-cheers.webp" alt="Francis and Julia toasting on their honeymoon" />

      <p className={styles.paragraph}>
        Our honeymoon was the postgame to our perfect wedding. I think about how much fun we had
        all the time. I love that we can entertain ourselves just doing something random no matter
        where we are in the world, like throwing a little tile in a pool as a new game we just
        made. I would do anything to go back.
      </p>

      <img className={styles.photo} src="/images/julia-ruby.webp" alt="Julia with our dog Ruby" />

      <p className={styles.paragraph}>
        Next stop: The birth of our (dog) child. October 5th, 2025 we brought our baby girl Ruby
        home. We counted down everyday for 2 weeks until Ruby day. We have watched her go from the
        terrified, hiding little baby to watching her conquer her fears in real time. This is a
        testament to how good of a mommy you are to her. Your patience, caring and unconditional
        love is why she has come such a long way.
      </p>

      <img className={styles.photo} src="/images/keys-to-house.webp" alt="Holding the keys to our new house" />

      <p className={styles.paragraph}>
        Another huge milestone all within a 6 month span. We became homeowners in a crazy time. It
        feels like fate because how did we get so lucky? Learning new skills with you has been so
        much fun. Sitting on the porch admiring our accomplishments has become one of my favorite
        pastimes.
      </p>

      <p className={styles.paragraph}>
        I just want to thank you for being the best person in the whole world. You motivate me to
        be the best version of myself every single day. Your unconditional love for me inspires me
        to be a better person. My goal in life is to make sure you are happy, healthy and taken
        care of. I hope I make you proud to be my wife.
      </p>

      <p className={styles.paragraph}>
        I really appreciate everything you do for me and Ruby. Happy 1 year anniversary. I love
        you so much!
      </p>

      <p className={styles.signoff}>
        Forever,
        <br />
        Francis
      </p>
    </article>
  );
}
