import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Domowa książka kucharska",
  description: "Prywatna książka kucharska z przepisami, zdjęciami i notatkami.",
  icons: {
    icon: "/images/recipes/logo.png",
    apple: "/images/recipes/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
