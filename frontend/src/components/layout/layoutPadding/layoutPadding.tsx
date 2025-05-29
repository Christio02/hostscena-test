'use client'

import { usePathname } from 'next/navigation'

export default function LayoutPadding() {
    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <div className={isHome ? '' : 'pt-[71px] tablet:pt-[79px]'} />
    )
}