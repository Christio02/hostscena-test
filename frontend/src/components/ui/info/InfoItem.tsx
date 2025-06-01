"use client"

import { useState } from 'react'
import { HiArrowLongRight } from 'react-icons/hi2'

interface Props {
    title?: string
    content?: React.ReactNode
    isLast?: boolean
}

export default function InfoItem({ title, content, isLast }: Props) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={`cursor-pointer border-t border-secondary ${isLast ? 'border-b' : ''}`}
        >
            <div
                className={`py-[10px] px-[5px] flex justify-between items-center hover:bg-secondary hover:text-primary transition-all duration-300 ${
                    open ? 'bg-secondary text-primary' : ''
                }`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <div>{title && <h3 className="text-h3">{title}</h3>}</div>
                <p className="flex items-center gap-1 text-h6">
                    LES MER
                    <HiArrowLongRight
                        size={30}
                        className={`transform transition-transform duration-300 ${
                            open ? 'rotate-90' : 'rotate-0'
                        }`}
                    />
                </p>
            </div>

            {open && (
                <div className="py-[20px] items-center flex w-full justify-center transition-all duration-300 ease-in-out animate-slideDown">
                    {content}
                </div>
            )}
        </div>
    )
}