import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const bodyFont = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
});

const headingFont = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  weight: ['700', '800'],
});

export const metadata: Metadata = {
  title: 'Kącik Kulinarny Aleksandry',
  description:
    'Prywatna książka kucharska z przepisami, zdjęciami i notatkami.',
  icons: {
    icon: '/images/recipes/logo.png',
    apple: '/images/recipes/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang='pl' className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
