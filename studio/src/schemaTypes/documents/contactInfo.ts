import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactinfo',
  title: 'Kontaktinfo',
  type: 'document',
  fields: [
    defineField({
      name: 'contactPersons',
      title: 'Kontaktpersoner',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'object',
          title: 'Kontaktperson',
          fields: [
            {
              name: 'namePerson',
              title: 'Navn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'position',
              title: 'Posisjon',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'email',
              title: 'Mail til personen',
              type: 'string',
              validation: (Rule) => Rule.email().required(),
            },
            {
              name: 'phone',
              title: 'Telefonnummer',
              type: 'string',
              validation: (Rule) => Rule.length(8).required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'address',
      title: 'Besøksadresse',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postbox',
      title: 'Postadresse',
      type: 'string',
      description: 'Til postbox',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosiale Medier lenker',
      description: 'Her kan du legge til flere sosiale medier lenker og logo',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Sosiale medie',
          fields: [
            {
              name: 'image',
              title: 'Bilde',
              type: 'image',
              description: 'Logo for sosiale mediet',
              options: {
                hotspot: true,
                sources: [],
                accept: 'image/*',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'someUrl',
              title: 'Lenke',
              type: 'url',
              description: 'Legg inn lenken til sosiale mediet',
            },
          ],
        },
      ],
    }),
  ],
})
