"use client"

import { useState } from 'react'
import { HiArrowLongRight, HiArrowLongDown } from 'react-icons/hi2'

interface Props {
    title?: string
    content?: React.ReactNode
    isLast?: boolean
}

export default function InfoItem({ title, content, isLast }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={`cursor-pointer border-t border-secondary  ${
                isLast ? 'border-b' : ''
            }`}
        >
            <div
                className={`py-[10px] flex justify-between hover:bg-secondary hover:text-primary items-center cursor-pointer transition-all duration-300 ${
                    open && 'bg-secondary text-primary' 
                }`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <div>{title && <h3 className="text-h3">{title}</h3>}</div>

                <p className="flex items-center gap-1 text-h6">
                    LES MER
                    {open ? <HiArrowLongDown size={30} /> : <HiArrowLongRight size={30} />}
                </p>
            </div>
            {open && (
                <div className="py-[20px] transition-all duration-300 ease-in-out animate-slideDown">
                    {content}
                </div>
            )}
        </div>
    )
}
