'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import NavLinks from "@/components/layout/navbar/NavLinks";
import MobileNavbar from "@/components/layout/navbar/MobileNavbar";

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

          <NavLinks />

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


        </div>
      </div>

      {open && <MobileNavbar onClose={() => setOpen(false)} />}
    </header>
  )
}
