import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Hjemmeside',
  type: 'document',
  fields: [
    defineField({
      name: 'startDate',
      title: 'StartDato',
      type: 'date',
      description: 'StartDato til festivalen som vises i header',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'SluttDato',
      type: 'date',
      description: 'SluttDato til festivalen som vises i header',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Sted',
      type: 'string',
      description: 'Stedet til festivalen som vises i header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageSnake',
      title: 'Bilder for bildeslange',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
          },

          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt tekst',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      options: {
        sortable: true,
        layout: 'grid',
      },
    }),
    defineField({
      name: 'backgroundVideo',
      title: "Video bak 'Kjøp festivalpass'",
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
