'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navLinks } from '@/constants/navigation'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'

const logo = '/assets/images/logo/logo_no_border.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen((prev) => !prev)

  return (
    <header className="relative z-50">
      <div className="border-b border-black px-[20px] py-[15px] tablet:py-[14px] bg-white">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={107}
              height={40}
              className="w-[81px] tablet:w-[107px] h-auto cursor-pointer"
              priority
            />
          </Link>

          <div className="tablet:hidden">
            <button
              onClick={toggleMenu}
              className={`flex flex-col gap-[6px] transition-transform duration-300 ${open ? 'rotate-90' : ''} focus:outline-none`}
              aria-label="Toggle menu"
            >
              <span className="w-[28px] h-[3px] bg-black" />
              <span className="w-[28px] h-[3px] bg-black" />
            </button>
          </div>

          <nav className="hidden tablet:flex gap-[10px] text-button">
            {navLinks
              .filter((link) => link.label.toLowerCase() !== 'hjem')
              .map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="border-[1px] border-secondary hover:bg-secondary hover:text-primary px-[10px]"
                >
                  {label}
                </Link>
              ))}
          </nav>
        </div>
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-black tablet:hidden">
          <nav>
            <div className="flex flex-col items-center gap-[10px] px-[20px] py-[20px]">
              {navLinks
                .filter((link) => link.label.toLowerCase() !== 'hjem')
                .map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="w-full text-center border-[1px] border-secondary text-button hover:bg-secondary hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
            </div>

            <div className="flex gap-[20px] justify-center w-full border-t border-black py-[20px]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={48} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={48} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={48} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
