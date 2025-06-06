import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Mail som kan bli kontaktet',
      validation: (Rule) => Rule.email().required(),
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
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description: 'Legg inn lenken til Instagram!',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'Legg inn lenken til Facebook!',
    }),
  ],
})
