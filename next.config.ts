import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Dev only. Lets the site be opened from another device on the LAN (e.g. a
   * phone at http://192.168.18.47:3002). Without this, Next 16 blocks the dev
   * resources for that origin, the page never hydrates, and every client
   * behaviour — hero autoplay, rail scrolling, lookbook — silently does nothing.
   * Update the IP if the machine's address changes.
   */
  allowedDevOrigins: ['192.168.18.47'],

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
