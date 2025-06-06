import { defineType } from 'sanity'
export default defineType({
  name: 'portableText',
  title: 'Rich Text Content',
  type: 'array',
  of: [
    { type: 'block' },
    {
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    },
  ],
})
