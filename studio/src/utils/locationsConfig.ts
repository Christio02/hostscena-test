export interface LocationConfig {
  // document type
  type: string
  // how to select from the doc
  select: Record<string, string>
  // render the “single” URL
  buildSingle: (doc: Record<string, any>) => {title: string; href: string}[]
}

export const locationConfigs: LocationConfig[] = [
  {
    type: 'home',
    select: {_id: '_id'},
    buildSingle: () => [{title: 'Hjemmeside', href: '/'}],
  },
  {
    type: 'news',
    select: {title: 'title', slug: 'slug.current'},
    buildSingle: (doc) => [
      {title: doc.title || 'Untitled News', href: `/nyheter/${doc.slug}`},
      {title: 'Alle nyheter', href: `/nyheter`},
    ],
  },
  {
    type: 'event',
    select: {title: 'title', slug: 'slug.current'},
    buildSingle: (doc) => [
      {title: doc.title || 'Untitled Event', href: `/program/${doc.slug}`},
      {title: 'Alle arrangementer', href: `/program`},
    ],
  },
  {
    type: 'page',
    select: {title: 'title', slug: 'slug.current'},
    buildSingle: (doc) =>
      doc.slug ? [{title: doc.title || 'Untitled Page', href: `/${doc.slug}`}] : [],
  },
]
