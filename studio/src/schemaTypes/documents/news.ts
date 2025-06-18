import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'Nyhet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/ø/g, 'o')
            .replace(/æ/g, 'ae')
            .replace(/å/g, 'a')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tag',
      title: 'Tagg',
      type: 'string',
      description: 'Valgfri kort tagg (f.eks. "Arrangement" eller "Frivillig")',
    }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'string',
      description: 'Valgfri: hvem saken handler om eller er av (f.eks. “Høstscena Ensemblet”)',
    }),
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Klokkeslett',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Må være i HH:mm format'),
      description: 'Valgfritt: f.eks. “18:00”',
    }),

    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'portableText',
      description: 'Trykk Enter for å legge til nytt avsnitt',
    }),
  ],
})
