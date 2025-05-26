import { HiArrowLongRight } from 'react-icons/hi2'
import Link from 'next/link'

type Props = {
    title: string
    linkText?: string
    linkUrl?: string
    borderTop?: boolean
}

export default function BorderTitleBar({ title, linkText, linkUrl, borderTop=true }: Props) {
    return (
        <div className="px-[20px]">
        <div className="py-[10px] flex justify-between items-center border-b border-black" style={{ borderTop: borderTop ? '1px solid black' : 'none' }}>
            <h3 className="text-h3">{title}</h3>
            {linkText && linkUrl && (
                <Link href={linkUrl} className="flex items-center gap-1 text-h6">
                    {linkText.toUpperCase()}
                    <HiArrowLongRight size={30} />
                </Link>
            )}
        </div>
        </div>
    )
}
