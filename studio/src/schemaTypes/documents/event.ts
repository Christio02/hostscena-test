import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Arrangement',
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
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      description: 'Hovedbilde for arrangementet',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
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
      name: 'startTime',
      title: 'Starttid',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Må være i HH:mm format'),
      placeholder: 'HH:mm (eks: 21:00)',
    }),
    defineField({
      name: 'endTime',
      title: 'Sluttid',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Må være i HH:mm format'),
      placeholder: 'HH:mm (eks: 21:00)',
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
    // utdrag kan også legges inn her
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'portableText',
      description: 'Trykk Enter for nytt avsnitt, Shift+Enter for linjeskift',
    }),
    defineField({
      name: 'contributors',
      title: 'Medvirkende',
      type: 'array',
      description: 'Legg til opptil 4 medvirkende personer',
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: 'object',
          title: 'Person',
          fields: [
            {
              name: 'image',
              title: 'Bilde',
              type: 'image',
              description: 'Bildet vil bli beskåret til kvadrat format',
              options: {
                hotspot: true,
                // set ratio
                sources: [],
                accept: 'image/*',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'artistType',
              title: 'Artisttype',
              type: 'string',
              description: 'F.eks: "Vokalist", "Sanger", "Komponist", etc.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'bio',
              title: 'Biografi',
              type: 'text',
              description: 'Kort beskrivelse av personen',
              validation: (Rule) => Rule.max(500),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'artistType',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      description: 'Legg til video som YouTube lenke eller last oppe en video!',
      type: 'object',
      fields: [
        {
          name: 'videoType',
          title: 'Video type',
          type: 'string',
          options: {
            list: [
              {title: 'YouTube lenke', value: 'youtube'},
              {title: 'Opplastet fil', value: 'upload'},
            ],
          },
        },
        {
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          description: 'Lim inn YouTube lenke',
          hidden: ({parent}) => parent?.videoType !== 'youtube',
          validation: (Rule) =>
            Rule.custom((url, context) => {
              const parent = context.parent as {videoType?: string}
              if (parent?.videoType === 'youtube' && !url) {
                return 'YouTube URL er påkrevd når video type er YouTube'
              }
              return true
            }),
        },
        {
          name: 'videoFile',
          title: 'Video fil',
          type: 'file',
          description: 'Last opp video fil',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.videoType !== 'upload',
          validation: (Rule) =>
            Rule.custom((file, context) => {
              const parent = context.parent as {videoType?: string}
              if (parent?.videoType === 'upload' && !file) {
                return 'Video fil er påkrevd når video type er opplastet fil'
              }
              return true
            }),
        },
      ],
      preview: {
        select: {
          videoType: 'videoType',
          youtubeUrl: 'youtubeUrl',
        },
        prepare({videoType, youtubeUrl}) {
          return {
            subtitle: videoType === 'youtube' ? `YouTube: ${youtubeUrl}` : 'Opplastet fil',
          }
        },
      },
    }),
    defineField({
      name: 'spotifyLink',
      title: 'Spotify lenke',
      type: 'url',
      description:
        'Lim inn hele Spotify embed URL (eks `https://open.spotify.com/embed/playlist/…`). Ikke påkrevd',
      validation: (Rule) => Rule.uri({allowRelative: false}),
    }),
    defineField({
      name: 'imageCarousel',
      title: 'Bildekarusell',
      type: 'array',
      description: 'Legg til bilder for karusell',
      of: [
        {
          type: 'object',
          title: 'Bilde',
          fields: [
            {
              name: 'image',
              title: 'Bilde',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
              description: 'Valgfri beskrivelse av bildet',
            },
            {
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
              description: 'Beskrivelse for skjermlesere',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'image',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Uten bildetekst',
                subtitle: subtitle,
                media: media,
              }
            },
          },
        },
      ],
    }),
  ],
})
