import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.css';

import InstallPrompt from '@/components/install-prompt';
import { Toaster } from '@/components/ui/sonner';

const font = Figtree({
  variable: '--font-figtree-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: 'Hotlines PH',
  title: 'Hotlines PH | Emergency Numbers Nationwide',
  description: 'Quick access to emergency hotlines across the Philippines.',
  keywords: [
    'Philippines emergency numbers',
    'police hotline',
    'fire hotline',
    'medical emergency',
    'government hotlines',
    'disaster response',
  ],
  authors: [{ name: 'Waffen', url: 'https://github.com/waffensultan' }],
  openGraph: {
    title: 'Hotlines PH',
    description: 'Quick access to emergency services across the Philippines.',
    url: 'https://hotlines.bettergov.ph',
    siteName: 'Hotlines PH',
    images: [
      // TODO: create an open graph image
      // {
      //   url: 'https://yourdomain.com/og-image.png',
      //   width: 1200,
      //   height: 630,
      //   alt: 'Hotlines Philippines',
      // },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hotlines PH',
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotlines PH',
    description: 'Quick access to emergency services across the Philippines.',
    // TODO: create an open graph image
    // images: ['https://yourdomain.com/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Hotlines PH',
    description: 'Quick access to emergency services across the Philippines.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${font.variable} ${font.variable} antialiased`}>
        {children}
        <InstallPrompt />
        <Toaster />
      </body>
    </html>
  );
}
