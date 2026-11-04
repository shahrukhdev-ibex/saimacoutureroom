import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 defaults this to [75] and silently coerces anything else to the
     * nearest allowed value — so a `quality={85}` prop would quietly become 75
     * and the preload would no longer match the rendered image.
     * 75 for grids and thumbnails, 85 where the embroidery has to hold up:
     * the hero, the front/back reveal and the lightbox.
     */
    qualities: [75, 85],

    /**
     * AVIF first. This site is almost entirely photographs of fabric, so the
     * extra encode time buys a real reduction over WebP.
     */
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
