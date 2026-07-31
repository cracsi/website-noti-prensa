import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "./lib/payload";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { draftMode } from 'next/headers'

export const metadata: Metadata = {
  title: {
    default: "The News Press",
    template: "%s | The News Press",
  },
  description: "Independent, community-focused journalism.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  let siteSettings
  try {
    siteSettings = await getSiteSettings()
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    siteSettings = { publicationName: 'The Daily Bridge', navItems: [], footerText: '', socialLinks: [] }
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
  {isEnabled && (
    <div className="bg-yellow-400 text-black text-center text-sm py-2">
      Preview Mode —{' '}
      <a href="/api/disable-preview" className="underline font-semibold">
        Exit Preview
      </a>
    </div>
  )}
  <Nav publicationName={siteSettings.publicationName} navItems={siteSettings.navItems || []} />
  <div className="flex-1">
    {children}
  </div>
  <Footer
    publicationName={siteSettings.publicationName}
    footerText={siteSettings.footerText}
    socialLinks={siteSettings.socialLinks || []}
  />
</body>
    </html>
  )
}