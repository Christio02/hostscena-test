import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Hjemmeside',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'string',
      description: 'Dato til festivalen som vises i header',
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
