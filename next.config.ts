import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600],
    imageSizes: [160, 256, 384],
    localPatterns: [
      { pathname: '/images/**', search: '' },
      { pathname: '/placeholder/**', search: '' },
    ],
  },
};

export default withNextIntl(nextConfig);
