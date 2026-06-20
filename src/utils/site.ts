export const SITE_NAME = 'Kącik Kulinarny Aleksandry';
export const SITE_DESCRIPTION =
  'Prywatna książka kucharska z przepisami, zdjęciami i notatkami.';

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'http://localhost:3000'
  );
}

export function getAbsoluteUrl(pathname = '/') {
  const normalizedPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`;

  return new URL(normalizedPathname, getSiteUrl()).toString();
}
