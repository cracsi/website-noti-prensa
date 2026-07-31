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
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          {publicationName}
        </Link>

        <nav className="hidden md:flex gap-6">
          {navItems?.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}