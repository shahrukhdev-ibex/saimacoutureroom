import type { Metadata, Viewport } from 'next';
import { Fraunces, Jost } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

/**
 * Self-hosted by next/font — no request to fonts.googleapis.com, no
 * render-blocking stylesheet, and a size-adjusted fallback so there is no
 * layout shift when the real face arrives.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
  variable: '--font-display',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-text',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description:
      'A small atelier for hand-embroidered South Asian occasion wear. Cut to measure, finished by hand, made one piece at a time.',
    url: '/',
    locale: site.locale,
    images: [
      {
        url: '/img/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: `A model in a bottle-green hand-embroidered sari from ${site.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Hand-Embroidered Occasion Wear`,
    description:
      'Zardozi, dori and cutwork saris, shararas and gowns. Cut to measure, finished by hand.',
    images: ['/img/og-cover.jpg'],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0E2621',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${fraunces.variable} ${jost.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
