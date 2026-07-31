import Link from 'next/link'

interface NavItem {
  label: string
  url: string
}

interface NavProps {
  publicationName: string
  navItems: NavItem[]
}

export function Nav({ publicationName, navItems }: NavProps) {
  return (
    <header className="bg-[#1c1f26] sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight text-[#f5f2eb] hover:text-white transition-colors"
        >
          {publicationName}
        </Link>

        <nav className="hidden md:flex gap-8">
          {navItems?.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="text-sm font-medium text-[#c9c4b8] hover:text-white transition-colors uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}