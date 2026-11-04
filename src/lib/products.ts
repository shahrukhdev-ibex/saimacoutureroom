/**
 * The collection. Adding a piece here adds it to the carousel, the lookbook,
 * the sitemap and the ItemList structured data — no other file to touch.
 *
 * Images live at /public/img/<slug>-<view>.webp at 1024x1536 (2:3).
 * next/image derives every smaller size, so one file per view is enough.
 */

export const VIEWS = ['front', 'walk', 'back', 'alt'] as const;
export type View = (typeof VIEWS)[number];

export type Product = {
  slug: string;
  /** Display name. */
  name: string;
  /** One line under the name on the card. */
  blurb: string;
  /** Fuller description, used in structured data. */
  detail: string;
  /** A colour lifted from the garment; tints the card behind the image. */
  tint: string;
  /** Alt text per view. Written out rather than templated — each says something. */
  alt: Record<View, string>;
};

export const PRODUCT_W = 1024;
export const PRODUCT_H = 1536;

/** Path to a product image. */
export const productImage = (slug: string, view: View) => `/img/${slug}-${view}.webp`;

export const products: Product[] = [
  {
    slug: 'verdant-grace',
    name: 'Verdant Grace',
    blurb: 'Bottle-green chiffon, scattered gold motifs, broad cutwork pallu border.',
    detail: 'Bottle-green cutwork chiffon sari',
    tint: '#14332B',
    alt: {
      front: 'Model in a bottle-green chiffon sari with gold cutwork border and scattered motifs',
      walk: 'Verdant Grace sari photographed mid-stride in a conservatory',
      back: 'Verdant Grace, back view showing the teardrop lattice cutwork panel',
      alt: 'Verdant Grace seen from a rear three-quarter angle',
    },
  },
  {
    slug: 'plum-regalia',
    name: 'Plum Regalia',
    blurb: 'Aubergine velvet over gold jacquard, heavy kora and naqshi panels.',
    detail: 'Aubergine front-open gown',
    tint: '#43152F',
    alt: {
      front: 'Model in an aubergine front-open gown over a gold jacquard panel',
      walk: 'Plum Regalia gown walking along a garden path',
      back: 'Plum Regalia, back view with mirrored gold panel work',
      alt: 'Plum Regalia seen from a rear three-quarter angle',
    },
  },
  {
    slug: 'golden-hour',
    name: 'Golden Hour',
    blurb: 'Front-open metallic jacket, scalloped hem, flared champagne skirt.',
    detail: 'Champagne-gold jacket gown',
    tint: '#7E6432',
    alt: {
      front: 'Model in a champagne-gold jacket gown with antique dori work over a flared skirt',
      walk: 'Golden Hour gown walking beside a courtyard pool',
      back: 'Golden Hour, back view with shoulder work and hanging tassels',
      alt: 'Golden Hour gown seen from a rear three-quarter angle by a pool',
    },
  },
  {
    slug: 'rosewood-ceremony',
    name: 'Rosewood Ceremony',
    blurb: 'Wine short shirt, ivory sharara with floral hem and a wide worked border.',
    detail: 'Wine shirt with ivory sharara',
    tint: '#5A1E28',
    alt: {
      front: 'Model in a wine embroidered shirt with an ivory floral sharara at dusk',
      walk: 'Rosewood Ceremony sharara walking along a lakeside terrace at sunset',
      back: 'Rosewood Ceremony, back view of the wine shirt and flared sharara',
      alt: 'Rosewood Ceremony seen from a rear three-quarter angle',
    },
  },
  {
    slug: 'sandstone-cutwork',
    name: 'Sandstone Cutwork',
    blurb: 'Sheer sand ground, dark cocoa floral cutwork border, stone neckline.',
    detail: 'Sand chiffon sari with cocoa cutwork border',
    tint: '#6B5441',
    alt: {
      front: 'Model in a sand chiffon sari with a dark cocoa floral cutwork border',
      walk: 'Sandstone Cutwork sari walking through a colonnade',
      back: 'Sandstone Cutwork, back view showing the scooped stone neckline',
      alt: 'Sandstone Cutwork sari, front and back compared',
    },
  },
  {
    slug: 'moonlit-teal',
    name: 'Moonlit Teal',
    blurb: 'Champagne net with mirror work, deep teal blouse, sequinned border.',
    detail: 'Champagne net sari with a teal blouse',
    tint: '#1D4A50',
    alt: {
      front: 'Model in a champagne net sari with mirror work and a deep teal embroidered blouse',
      walk: 'Moonlit Teal sari draped and walking past a rose border',
      back: 'Moonlit Teal, back view of the teal embroidered blouse',
      alt: 'Moonlit Teal sari seated in a garden',
    },
  },
  {
    slug: 'emerald-heirloom',
    name: 'Zumurrud',
    blurb: 'Bottle-green kameez with gold zari, straight trouser and matching dupatta.',
    detail: 'Bottle-green embroidered kameez set',
    tint: '#143F36',
    alt: {
      front: 'Model in a bottle-green kameez with dense gold zari embroidery',
      walk: 'Zumurrud kameez set walking through a rose garden',
      back: 'Zumurrud, seated view showing the draped embroidered dupatta',
      alt: 'Zumurrud kameez set beneath a flowering garden arch',
    },
  },
  {
    slug: 'amethyst-hour',
    name: 'Amethyst Hour',
    blurb: 'Amethyst silk, gold-bordered organza dupatta, scattered sequin sprays.',
    detail: 'Amethyst silk kurta and palazzo',
    tint: '#4E2154',
    alt: {
      front: 'Model in an amethyst silk kurta and palazzo with a gold-bordered organza dupatta',
      walk: 'Amethyst Hour kurta and palazzo walking across a lawn',
      back: 'Amethyst Hour, seated view with the organza dupatta draped',
      alt: 'Amethyst Hour set beneath a flowering arch',
    },
  },
  {
    slug: 'olive-reverie',
    name: 'Olive Reverie',
    blurb: 'Moss-green crushed sharara, tonal thread shirt, ivory chikan dupatta.',
    detail: 'Moss sharara set with an ivory dupatta',
    tint: '#5C5F2A',
    alt: {
      front: 'Model in a moss-green sharara set with an ivory embroidered dupatta',
      walk: 'Olive Reverie sharara walking through a garden',
      back: 'Olive Reverie, seated view showing the crushed sharara panels',
      alt: 'Olive Reverie sharara set under a white floral arch',
    },
  },
  {
    slug: 'smoke-and-pine',
    name: 'Smoke & Pine',
    blurb: 'Lilac-grey printed long shirt over a crushed pine-green sharara.',
    detail: 'Printed long shirt with a pine sharara',
    tint: '#3A3D4A',
    alt: {
      front: 'Model in a lilac-grey printed long shirt over a pine-green sharara',
      walk: 'Smoke and Pine set walking through a garden',
      back: 'Smoke and Pine, back view of the printed shirt and pine sharara',
      alt: 'Smoke and Pine set seated on a garden bench',
    },
  },
  {
    slug: 'ivory-serenade',
    name: 'Ivory Serenade',
    blurb: 'Ivory net, tonal thread and pearl sprays, sheer dupatta with a worked edge.',
    detail: 'Ivory net suit with tonal thread',
    tint: '#8A7A63',
    alt: {
      front: 'Model in an ivory net suit with tonal thread work and a sheer dupatta',
      walk: 'Ivory Serenade suit walking through a rose garden',
      back: 'Ivory Serenade, back view of the ivory net shirt',
      alt: 'Ivory Serenade suit seen from a rear three-quarter angle',
    },
  },
  {
    slug: 'champagne-dusk',
    name: 'Champagne Dusk',
    blurb: 'Champagne jacquard kurta, matching palazzo, tasselled contrast dupatta.',
    detail: 'Champagne kurta with a tasselled dupatta',
    tint: '#7A6448',
    alt: {
      front: 'Model in a champagne jacquard kurta and palazzo with a tasselled dupatta',
      walk: 'Champagne Dusk kurta and palazzo beside a courtyard pool',
      back: 'Champagne Dusk, back view of the champagne kurta and palazzo',
      alt: 'Champagne Dusk photographed from behind beside a courtyard pool',
    },
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

/** The five pieces that run in the hero slider, in order. */
export const heroSlugs = [
  'verdant-grace',
  'plum-regalia',
  'golden-hour',
  'rosewood-ceremony',
  'amethyst-hour',
] as const;

/** The piece used for the drag-to-reveal front/back comparison. */
export const spotlightSlug = 'plum-regalia';

export const categories = [
  {
    title: 'Saris and drapes',
    copy: 'Chiffon, net and organza with cutwork and stone borders. Pre-draped on request.',
    slug: 'verdant-grace',
    view: 'walk' as View,
  },
  {
    title: 'Shararas and gharara sets',
    copy: 'Full-flare panels, worked hems and a shirt cut to the length you actually want.',
    slug: 'rosewood-ceremony',
    view: 'walk' as View,
  },
  {
    title: 'Gowns and jacket sets',
    copy: 'Front-open jackets, trained skirts and long gowns for walima and reception.',
    slug: 'golden-hour',
    view: 'walk' as View,
  },
];

/** Lookbook order — a mix of views so the masonry doesn't read as one pose. */
export const lookbook: { slug: string; view: View }[] = [
  { slug: 'verdant-grace', view: 'walk' },
  { slug: 'golden-hour', view: 'alt' },
  { slug: 'emerald-heirloom', view: 'alt' },
  { slug: 'rosewood-ceremony', view: 'walk' },
  { slug: 'moonlit-teal', view: 'walk' },
  { slug: 'olive-reverie', view: 'alt' },
  { slug: 'champagne-dusk', view: 'walk' },
  { slug: 'sandstone-cutwork', view: 'walk' },
  { slug: 'smoke-and-pine', view: 'alt' },
  { slug: 'amethyst-hour', view: 'walk' },
  { slug: 'ivory-serenade', view: 'alt' },
  { slug: 'plum-regalia', view: 'walk' },
];
