import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // news content type
    news: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled News',
            href: `/nyheter/${doc?.slug}`,
          },
          {title: 'Alle nyheter', href: `/nyheter`},
        ],
      }),
    }),

    // event content type
    event: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled Event',
            href: `/program/${doc?.slug}`,
          },
          {title: 'Alle arrangementer', href: `/program`},
        ],
      }),
    }),

    // static pages
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        const slug = doc?.slug
        if (!slug) return {locations: []}

        return {
          locations: [
            {
              title: doc?.title || 'Untitled Page',
              href: `/${slug}`,
            },
          ],
        }
      },
    }),
  },
}
