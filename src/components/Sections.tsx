import Image from 'next/image';
import {
  categories,
  productImage,
  bySlug,
  PRODUCT_W,
  PRODUCT_H,
} from '@/lib/products';
import {
  storyImage,
  steps,
  faq,
  occasions,
  craftImage,
  CRAFT_W,
  CRAFT_H,
} from '@/lib/content';
import { site, whatsappHref, emailHref, instagramHref } from '@/lib/site';
import { WhatsAppIcon } from './icons';
import s from './Sections.module.css';

/* ── marquee ──────────────────────────────────────────────────────── */
export function Marquee() {
  // doubled so the -50% keyframe loops seamlessly
  const row = [...occasions, ...occasions];
  return (
    <div className={s.marquee} aria-hidden="true">
      <div className={s.marqueeRow}>
        {row.map((o, i) => (
          <span key={i}>
            {o}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── brand story ──────────────────────────────────────────────────── */
export function Story() {
  return (
    <section className={s.room} id="story">
      <div className={s.roomText}>
        <h2 className="h-display">
          A room, a table,
          <br />
          and a long habit
          <br />
          of looking twice.
        </h2>
        <p className="lead">
          Saima&rsquo;s Couture Room started with one sewing table and a stubborn idea: a piece
          should look as considered from the back as it does from the front.
        </p>
        <p>
          Nothing here is graded off a size chart. Every commission is patterned for one person, then
          handed to a karigar who works the embroidery from start to finish rather than passing it
          down a line. It is slower. It is also the only way the motifs line up across a seam.
        </p>
        <p>We keep the edit small on purpose &mdash; twelve pieces at a time, so each one can be answered for.</p>
        <a className="link-u" href="#bespoke">
          How a commission works
        </a>
      </div>

      <figure className={s.roomImg}>
        <Image
          src={craftImage(storyImage.id)}
          alt={storyImage.alt}
          width={CRAFT_W}
          height={CRAFT_H}
          sizes="(max-width:860px) 92vw, 40vw"
        />
        <figcaption>{storyImage.caption}</figcaption>
      </figure>
    </section>
  );
}

/* ── categories ───────────────────────────────────────────────────── */
export function Categories() {
  return (
    <section className={s.cats} aria-labelledby="cats-h">
      <h2 className="sec-h" id="cats-h">
        What we make
      </h2>
      <div className={s.catsGrid}>
        {categories.map((c) => (
          <a
            key={c.title}
            className={s.cat}
            href="#collection"
            style={{ ['--img' as string]: `url('${productImage(c.slug, c.view)}')` }}
          >
            <span className={s.catBody}>
              <b>{c.title}</b>
              <em>{c.copy}</em>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ── bespoke process ──────────────────────────────────────────────── */
export function Process() {
  return (
    <section className={s.steps} id="bespoke">
      <div className="sec-head">
        <div>
          <h2 className="sec-h">How a commission works</h2>
          <p className="sec-sub">Four stages, about six to nine weeks for a heavily worked piece.</p>
        </div>
      </div>
      <ol className={s.stepsList}>
        {steps.map((st, i) => (
          <li key={st.title}>
            <span className={s.stepsN}>{i + 1}</span>
            <h3>{st.title}</h3>
            <p>{st.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── appointment call to action ───────────────────────────────────── */
export function Appointment() {
  return (
    <section className={s.cta} id="appointment">
      <div
        className={s.ctaBg}
        aria-hidden="true"
        style={{ ['--img' as string]: "url('/img/bg-appointment.webp')" }}
      />
      <div className={s.ctaIn}>
        <p className="kicker">Private fittings</p>
        <h2 className="h-display">
          Come and see the
          <br />
          cloth in daylight.
        </h2>
        <p>
          Photographs flatten embroidery. Book an hour in the room, handle the fabric, and try the
          silhouette before anything is cut.
        </p>
        <div className={s.ctaActs}>
          <a
            className="btn btn--gold btn--lg"
            href={whatsappHref("I'd like to book a fitting")}
            target="_blank"
            rel="noopener"
          >
            Book on WhatsApp
          </a>
          <a className="btn btn--ghost btn--lg" href={emailHref}>
            Email the room
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── faq ──────────────────────────────────────────────────────────── */
export function Faq() {
  return (
    <section className={s.faq} id="faq">
      <div className="sec-head">
        <div>
          <h2 className="sec-h">Before you ask</h2>
          <p className="sec-sub">The six questions we get most. Anything else, just message.</p>
        </div>
      </div>

      <div className={s.faqList}>
        {faq.map((item, i) => (
          <details key={item.q} className={s.qa} open={i === 0}>
            <summary>
              <span>{item.q}</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── visit / contact ──────────────────────────────────────────────── */
export function Visit() {
  const piece = bySlug('champagne-dusk')!;
  return (
    <section className={s.visit} id="visit">
      <div className={s.visitCopy}>
        <h2 className="sec-h">Visit the room</h2>
        <p className="sec-sub">
          Fittings are by appointment so the room is yours for the hour. WhatsApp is the fastest way
          to reach us &mdash; send a photograph of what you have in mind.
        </p>

        <a className={s.wa} href={whatsappHref()} target="_blank" rel="noopener">
          <WhatsAppIcon />
          <span>
            <b>Message on WhatsApp</b>
            <em>{site.contact.phoneDisplay}</em>
          </span>
        </a>

        <dl className={s.visitD}>
          <div>
            <dt>Studio</dt>
            <dd>
              {site.address.street}, {site.address.locality}
              <br />
              {site.address.region}, {site.address.postalCode}
            </dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>
              {site.hours.label}
              <br />
              {site.hours.opens} &ndash; {site.hours.closes}
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={emailHref}>{site.contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={instagramHref} target="_blank" rel="noopener">
                @{site.contact.instagram}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <figure className={s.visitImg}>
        <Image
          src={productImage(piece.slug, 'alt')}
          alt={piece.alt.alt ?? piece.name}
          width={PRODUCT_W}
          height={PRODUCT_H}
          sizes="(max-width:900px) 92vw, 42vw"
        />
      </figure>
    </section>
  );
}
