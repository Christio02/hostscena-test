import { defineQuery } from 'next-sanity'

export const SINGLE_MAP_QUERY = defineQuery(`
  *[_type == "map"][0] {
    _id,
    _type,
    mapUrl,
  }
`)
