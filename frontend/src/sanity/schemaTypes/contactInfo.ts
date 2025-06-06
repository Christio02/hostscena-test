import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactinfo',
  title: 'Kontaktinfo',
  type: 'document',
  fields: [
    defineField({
      name: 'person',
      title: 'Kontaktperson',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Posisjon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Mail til personen',
      type: 'string',
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
      validation: (Rule) => Rule.length(8).required(),
    }),
  ],
})
