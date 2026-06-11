import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Cookbook",
  description: "A private cookbook prototype for Markdown recipes and photos.",
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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
