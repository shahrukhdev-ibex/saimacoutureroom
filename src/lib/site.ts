/**
 * Single source of truth for everything that changes between the placeholder
 * site and the real one. In the static build these values were scattered across
 * 24 places in the HTML; here you change them once.
 *
 * Anything below can also be set from the environment at build time, which is
 * how you'd keep a real phone number out of the repo.
 */

const DEFAULT_URL = 'https://saimascoutureroom.com';

/**
 * `??` only falls back on null/undefined, so an env var that is *present but
 * empty* — which is what a blank field in the Vercel dashboard produces —
 * slips straight through. Treat blank and whitespace-only as "not set".
 */
function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/**
 * Returns a valid absolute origin, or null. Tolerates a bare hostname
 * ("example.com"), a trailing slash, and anything unparseable.
 */
function toOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

// Read each variable statically — Next only inlines `process.env.NAME`, never
// a computed key, so these cannot be looked up dynamically in a loop.
const SITE_URL =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  // Vercel system variables, exposed when "Automatically expose System
  // Environment Variables" is on. The first is the stable production domain,
  // the second is the per-deployment URL that makes preview builds correct.
  toOrigin(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.NEXT_PUBLIC_VERCEL_URL) ??
  DEFAULT_URL;

export const site = {
  name: "Saima's Couture Room",
  shortName: 'Couture Room',
  /** Always a valid absolute origin with no trailing slash. */
  url: SITE_URL,
  locale: 'en_GB',
  lang: 'en',

  title: "Saima's Couture Room | Hand-Embroidered Saris, Shararas & Gowns",
  description:
    'A small atelier for hand-embroidered South Asian occasion wear. Zardozi, dori and cutwork saris, shararas and gowns, cut to measure and finished by hand. Book a private fitting.',
  shortDescription:
    'Hand-embroidered occasion wear, cut to measure and finished in the room.',

  /** TODO: replace every value in this block before launch. */
  contact: {
    /** Digits only, with country code, no `+` — this builds the wa.me link. */
    whatsapp: envOr(process.env.NEXT_PUBLIC_WHATSAPP, '923000000000'),
    /** The same number, formatted for a human to read. */
    phoneDisplay: envOr(process.env.NEXT_PUBLIC_PHONE_DISPLAY, '+92 300 000 0000'),
    /** E.164-ish, for structured data. */
    phoneSchema: envOr(process.env.NEXT_PUBLIC_PHONE_SCHEMA, '+92-300-000-0000'),
    email: envOr(process.env.NEXT_PUBLIC_EMAIL, 'hello@saimascoutureroom.com'),
    instagram: 'saimascoutureroom',
    facebook: 'saimascoutureroom',
  },

  address: {
    street: 'Studio address',
    locality: 'City',
    region: 'Region',
    postalCode: '00000',
    /** ISO 3166-1 alpha-2. */
    country: 'PK',
  },

  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const,
    label: 'Monday to Saturday',
    opens: '11:00',
    closes: '19:00',
  },

  /** Shown in the dismissible bar above the header. Set to null to hide it. */
  announcement: {
    text: 'Wedding-season fittings for 2026 are open. Twelve bridal commissions only.',
    ctaLabel: 'Book a fitting',
    ctaHref: '#visit',
  } as { text: string; ctaLabel: string; ctaHref: string } | null,
} as const;

/** wa.me link, optionally pre-filling the first message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const instagramHref = `https://instagram.com/${site.contact.instagram}`;
export const facebookHref = `https://facebook.com/${site.contact.facebook}`;
export const emailHref = `mailto:${site.contact.email}`;

export const nav = [
  { href: '#collection', label: 'The collection' },
  { href: '#craft', label: 'Craft' },
  { href: '#bespoke', label: 'Bespoke' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#visit', label: 'Visit' },
] as const;
