import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tickets',
  title: 'Billettside',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Første avsnitt',
      type: 'portableText',
      description:
        'Første avsnittet på billettsiden. ' +
        'Trykk Enter for nytt avsnitt, ' +
        'Shift+Enter for linjeskift',
      validation: (Rule) => Rule.required().error('Du må legge til innhold!'),
    }),
  ],
  preview: {
    // 1) grab the raw blocks array
    select: {
      blocks: 'section',
    },
    // 2) flatten them to plain text and trim
    prepare({blocks}) {
      const text = Array.isArray(blocks)
        ? blocks
            .filter((blk) => blk._type === 'block')
            .map((blk) =>
              blk.children
                .filter((child) => child._type === 'span')
                .map((span) => span.text)
                .join(''),
            )
            .join(' ')
        : ''

      const excerpt = text.length > 20 ? text.slice(0, 20) + '…' : text

      return {
        title: excerpt || 'Ingen tekst',
      }
    },
  },
})
