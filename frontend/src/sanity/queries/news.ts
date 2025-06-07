import { defineQuery } from 'next-sanity'

export const NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)]
    | order(date desc)[0...12]{
      _id,
      title,
      slug,
      tag,
      person,
      date,
      time,
      image,
      content
    }
`)

export const NEWS_DETAIL_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    tag,
    person,
    date,
    time,
    image,
    content
  }
`)

export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)]
    | order(date desc){
      _id,
      title,
      slug,
      tag,
      person,
      date,
      time,
      image,
      content
    }
`)
