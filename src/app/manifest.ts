import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hotlines PH',
    short_name: 'Hotlines PH',
    description: 'Philippine hotlines by BetterGov.PH',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    icons: [
      {
        src: 'icons/web-app-manifest-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
