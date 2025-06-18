import { defineQuery } from 'next-sanity'

export const NEWS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)] && !(_id in path("drafts.**"))
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
  *[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
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
  *[_type == "news" && defined(slug.current) && !(_id in path("drafts.**"))]
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
