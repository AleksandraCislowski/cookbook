import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import {
  getAbsoluteUrl,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/utils/site';
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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    locale: 'pl_PL',
    type: 'website',
    images: [
      {
        url: getAbsoluteUrl('/images/recipes/logo.png'),
        width: 1200,
        height: 900,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [getAbsoluteUrl('/images/recipes/logo.png')],
  },
  icons: {
    icon: '/favicon-transparent.png',
    apple: '/favicon-transparent.png',
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
