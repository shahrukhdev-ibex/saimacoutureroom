/** Craft close-ups, techniques, process steps, FAQ and testimonials. */

export const CRAFT_W = 960;
export const CRAFT_H = 1280;
export const craftImage = (id: string) => `/img/${id}.webp`;

/** The six frames in the craft grid. First one spans two rows, fifth spans two columns. */
export const craft = [
  { id: 'craft-02', caption: 'Brocade ground, cutwork hem', alt: 'Gold brocade ground finished with a maroon band and a gold cutwork hem' },
  { id: 'craft-01', caption: 'Naqshi zigzag, pearl edge', alt: 'Naqshi thread worked into a zigzag border edged with pearls' },
  { id: 'craft-06', caption: 'Cutwork lattice on teal', alt: 'Gold cutwork lattice laid over a deep teal ground' },
  { id: 'craft-10', caption: 'Champagne sheer, scattered sprays', alt: 'Champagne sheer scattered with fine gold sprays and sequins' },
  { id: 'craft-03', caption: 'Gold border against bandhani', alt: 'Broad gold border stitched against blue bandhani cloth' },
  { id: 'craft-07', caption: 'Turquoise organza, worked edge', alt: 'Turquoise organza finished with a worked gold edge' },
];

/** The image beside the brand story. */
export const storyImage = {
  id: 'craft-05',
  alt: 'Close detail of dense antique-gold zardozi embroidery on a champagne ground',
  caption: 'Antique-gold zardozi, worked by hand on a champagne ground',
};

export const techniques = [
  { name: 'Zardozi', copy: 'Metal thread laid and couched by hand, the heaviest work on the piece.' },
  { name: 'Dori', copy: 'Fine corded outline that holds a motif’s shape after years of wear.' },
  { name: 'Kora & naqshi', copy: 'Matte and bright metal coils, used together so the light breaks up.' },
  { name: 'Sheesha', copy: 'Mirror discs stitched into a frame of thread, never glued.' },
  { name: 'Cutwork', copy: 'Net cut away behind the motif, leaving embroidery floating on skin.' },
  { name: 'Pearl & bead', copy: 'Weight at the hem and the pallu edge, so the fabric falls properly.' },
];

export const steps = [
  {
    title: 'Tell us the occasion',
    copy: 'Send the date, the event and any piece from the collection you are drawn to. We will tell you straight away whether the timeline works.',
  },
  {
    title: 'Choose cloth and work',
    copy: 'We send fabric options and embroidery samples against your colour. You decide the ground, the density of the work and the silhouette.',
  },
  {
    title: 'Measure and fit',
    copy: 'Measurements in the room, or a guide and a garment that already fits you. Bridal commissions get three fittings; everything else gets one.',
  },
  {
    title: 'Finish and deliver',
    copy: 'Final press, lining, tassels and a last check on every seam. Then boxed and shipped, insured and tracked.',
  },
];

/** Rendered on the page and mirrored into FAQPage structured data. */
export const faq = [
  {
    q: 'How long does a piece take to make?',
    a: 'A lightly worked suit takes about three weeks. A heavily embroidered sari or bridal piece takes six to nine weeks, because the handwork is done by one karigar rather than split across a line. Tell us your date first and we will say honestly whether it is possible.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. Pieces ship worldwide, insured and tracked, in a boxed garment bag. Duties are payable by the recipient. Delivery is usually five to nine working days once the piece is finished.',
  },
  {
    q: 'Can I order a piece in a different colour?',
    a: 'Almost always. Most designs can be re-made in another colourway, and we can change the ground fabric, the density of the work or the length of the shirt. Send us the piece you like and describe what you would change.',
  },
  {
    q: 'How does sizing work?',
    a: 'Everything is cut to measure. We send a short measurement guide with photographs, or you can send an existing garment that fits you well and we will pattern from that. One round of alterations is included.',
  },
  {
    q: 'Do you take bridal commissions?',
    a: 'Yes, and we take a limited number each season so that the work is not rushed. Bridal commissions begin with a consultation, a fabric and embroidery selection, and a schedule of three fittings.',
  },
  {
    q: 'What does a piece cost?',
    a: 'Price depends on the fabric, the density of the handwork and the number of pieces in the set, so each piece is quoted individually. Message us about a piece and you will get a firm price, not a range.',
  },
];

/**
 * PLACEHOLDERS. Replace with real client notes, or set this to [] and the
 * section removes itself. Do not launch with invented reviews.
 */
export const testimonials = [
  { quote: '[Replace with a real client note — what they ordered, how it fitted, how the timeline went.]', by: 'Client name, city' },
  { quote: '[Replace with a real client note — useful ones mention the handwork or the fit.]', by: 'Client name, city' },
  { quote: '[Replace with a real client note — an international order works well here.]', by: 'Client name, city' },
];

export const occasions = ['Nikkah', 'Walima', 'Mehndi', 'Eid', 'Reception', 'Mayun', 'Engagement'];
