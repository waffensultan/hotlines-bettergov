import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist, StaleWhileRevalidate } from 'serwist';
import revisions from '../revisions.json';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ request }) => request.destination === 'image',
      handler: new StaleWhileRevalidate({ cacheName: 'images' }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: '/',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
});

serwist.addToPrecacheList(revisions);

serwist.addEventListeners();
