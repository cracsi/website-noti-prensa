interface SocialLink {
  platform: string
  url: string
}

interface FooterProps {
  publicationName: string
  footerText?: string | null
  socialLinks?: SocialLink[]
}

export function Footer({ publicationName, footerText, socialLinks }: FooterProps) {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600">
        <p className="mb-4">{footerText}</p>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex gap-4 mb-4">
            {socialLinks.map((link, i) => (
  <a
    key={i}
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-600 transition-colors"
  >
    {link.platform}
  </a>
))}
          </div>
        )}

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {publicationName}
        </p>
      </div>
    </footer>
  )
}