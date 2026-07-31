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
    <footer className="bg-[#1c1f26] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-sm text-[#c9c4b8]">
        <p className="mb-6 max-w-xl leading-relaxed">{footerText}</p>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex gap-6 mb-6">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#e8e4d8] hover:text-white transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}

        <div className="border-t border-[#333844] pt-6">
          <p className="text-xs text-[#8a8578]">
            © {new Date().getFullYear()} {publicationName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}