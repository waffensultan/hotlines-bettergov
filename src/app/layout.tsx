import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.css';

import InstallPrompt from '@/components/InstallPrompt';
import { Toaster } from '@/components/ui/sonner';

const font = Figtree({
  variable: '--font-figtree-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: 'Hotlines PH',
  title: 'Hotlines PH | Emergency Numbers Nationwide',
  description:
    'Quick access to emergency hotlines across the Philippines. Find police, fire, medical, disaster, and government contacts by region, province, and city.',
  keywords: [
    'Philippines emergency numbers',
    'police hotline',
    'fire hotline',
    'medical emergency',
    'government hotlines',
    'disaster response',
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hotlines PH',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Hotlines PH',
    description:
      'Find emergency hotlines for police, fire, medical, and government services in your area.',
    // url: 'https://yourdomain.com',
    siteName: 'Hotlines Philippines',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Hotlines Philippines',
    //   },
    // ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotlines Philippines',
    description:
      'Emergency hotlines for police, fire, medical, and government services across the Philippines.',
    // images: ['https://yourdomain.com/og-image.png'],
  },
  // alternates: {
  //   canonical: 'https://yourdomain.com',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} ${font.variable} antialiased`}>
        {children}
        <InstallPrompt />
        <Toaster />
      </body>
    </html>
  );
}
