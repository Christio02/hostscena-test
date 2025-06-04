import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'performer',
      title: 'Artist',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Starttid',
      type: 'string',
      description: 'eks: "19:00"',
    }),
    defineField({
      name: 'endTime',
      title: 'Sluttid',
      type: 'string',
      description: 'eks: "21:00"',
    }),
    defineField({
      name: 'location',
      title: 'Sted',
      type: 'string',
      description: 'Navn på lokale',
    }),
    defineField({
      name: 'link',
      title: 'Lenke til billett',
      type: 'url',
      description: 'Valgfritt: En lenke der brukere kan kjøpe billett',
    }),
    defineField({
      name: 'tag',
      title: 'Tagg',
      type: 'string',
      description: 'Valgfri kort tagg/sjanger (eks: "Jazz", "Verksted", etc.)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'content',
    //   title: 'Innhold',
    //   type: 'portableText',
    //   description: 'Trykk Enter for å legge til nytt avsnitt',
    // }),
  ],
})
