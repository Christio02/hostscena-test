import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tickets',
  title: 'Billettside',
  type: 'document',
  fields: [
    defineField({
      name: 'firstSection',
      title: 'Første avsnitt',
      type: 'portableText',
      description:
        'Første avsnittet på billettsiden. ' +
        'Trykk Enter for nytt avsnitt, ' +
        'Shift+Enter for linjeskift',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondSection',
      title: 'Andre avsnitt',
      type: 'portableText',
      description:
        'Andre avsnittet på billettsiden. Trykk Enter for nytt avsnitt, Shift+Enter for linjeskift',

      validation: (Rule) => Rule.required(),
    }),
  ],
})
