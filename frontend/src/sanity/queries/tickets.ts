import { defineQuery } from 'next-sanity'

export const TICKETS_QUERY = defineQuery(`
  *[_type == "tickets" && !(_id in path("drafts.**"))][0] {
    _id,
    _type,
    section
  }
`)
