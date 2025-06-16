import { defineQuery } from 'next-sanity'

export const TICKETS_QUERY = defineQuery(`
  *[_type == "tickets"][0] {
    _id,
    _type,
    firstSection,
    secondSection,
  }
`)
