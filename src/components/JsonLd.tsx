import { site, instagramHref, facebookHref } from '@/lib/site';
import { products } from '@/lib/products';
import { faq } from '@/lib/content';

/**
 * Structured data, built from the same objects that render the page — so the
 * FAQ schema can never drift out of sync with the visible FAQ, and adding a
 * product to lib/products.ts adds it to the ItemList automatically.
 */
export function JsonLd() {
  const graph = [
    {
      '@type': ['ClothingStore', 'LocalBusiness'],
      '@id': `${site.url}/#business`,
      name: site.name,
      description:
        'Atelier for hand-embroidered South Asian occasion wear — saris, shararas, gharara sets and gowns, cut to measure and finished by hand.',
      url: `${site.url}/`,
      image: `${site.url}/img/og-cover.jpg`,
      logo: `${site.url}/img/icon-512.png`,
      telephone: site.contact.phoneSchema,
      email: site.contact.email,
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [...site.hours.days],
          opens: site.hours.opens,
          closes: site.hours.closes,
        },
      ],
      sameAs: [instagramHref, facebookHref],
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Made-to-measure occasion wear',
          serviceType: 'Bespoke tailoring and hand embroidery',
        },
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { '@id': `${site.url}/#business` },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'ItemList',
      name: 'The 2026 edit',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.name} — ${p.detail}`,
        image: `${site.url}/img/${p.slug}-front.webp`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  // Every value above is authored in this repo, but escape anyway so a stray
  // "</script>" in future copy can never break out of the script element.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
