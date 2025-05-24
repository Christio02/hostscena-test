import Link from 'next/link'
import { navLinks } from '@/constants/navigation'

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1 className="text-display leading-none">
        Høst
        <br />
        Scena
      </h1>
      <nav className="flex gap-2">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="border px-2 py-1 text-sm hover:bg-gray-100 transition"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
