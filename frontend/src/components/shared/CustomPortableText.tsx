// frontend/src/components/shared/CustomPortableText.tsx
'use client'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'
import { PortableTextBlock } from '@portabletext/types'

const ptComponents: PortableTextComponents = {
  block: {
    // default p render
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  marks: {
    // internal link within next js
    internalLink: ({ value, children }) => {
      const ref = value?.reference

      const mapTypeToPath = (type: string | undefined) => {
        switch (type) {
          case 'event':
            return 'program'
          case 'news':
            return 'nyheter'
          default:
            return type || ''
        }
      }

      const path = mapTypeToPath(ref?._type)
      const href = ref?.slug?.current ? `/${path}/${ref.slug.current}` : '/'

      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      )
    },
    // external link e.g. to vg.no
    link: ({ value, children }) => {
      // Read https://css-tricks.com/use-target_blank/
      const { href, blank } = value || {}
      return blank ? (
        <a href={href} target="_blank" rel="noopener" className="underline">
          {children}
        </a>
      ) : (
        <a href={href} className="underline">
          {children}
        </a>
      )
    },
  },
}

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={ptComponents} />
}
