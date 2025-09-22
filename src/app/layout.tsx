import type { Metadata } from 'next';
import Nav from '@/components/nav';
import './globals.css';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Hotlines Philippines',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
