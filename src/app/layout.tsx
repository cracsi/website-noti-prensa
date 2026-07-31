import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "./lib/payload";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "The News Press",
  description: "Independent, community-focused journalism.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteSettings

  try {
    siteSettings = await getSiteSettings();
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    siteSettings = { publicationName: 'The Daily Bridge', navItems: [], footerText: '', socialLinks: [] }
  }

  return (
    <html lang="en">
      <body>
        <Nav
          publicationName={siteSettings.publicationName}
          navItems={siteSettings.navItems || []}
        />
        {children}
        <Footer
          publicationName={siteSettings.publicationName}
          footerText={siteSettings.footerText}
          socialLinks={siteSettings.socialLinks || []}
        />
      </body>
    </html>
  );
}