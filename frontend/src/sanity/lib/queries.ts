import { defineQuery } from 'next-sanity'

// news queries
export const NEWS_QUERY =
  defineQuery(`*[_type == "news" && defined(slug.current)] | order(date desc)[0...12]{
  _id,
  title,
  slug,
  tag,
  person,
  date,
  time,
  image,
  content
}`)

export const NEWS_DETAIL_QUERY = defineQuery(`*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  tag,
  person,
  date,
  time,
  image,
  content
}`)

export const ALL_NEWS_QUERY =
  defineQuery(`*[_type == "news" && defined(slug.current)] | order(date desc){
  _id,
  title,
  slug,
  tag,
  person,
  date,
  time,
  image,
  content
}`)

// event queries
export const EVENTS_QUERY =
  defineQuery(`*[_type == "event" && defined(slug.current)] | order(date asc)[0...12]{
  _id,
  title,
  slug,
  performer,
  date,
  startTime,
  endTime,
  location,
  tag,
  image,
  content
}`)

export const EVENT_DETAIL_QUERY = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  performer,
  date,
  startTime,
  endTime,
  location,
  tag,
  image,
  content
}`)

export const ALL_EVENTS_QUERY =
  defineQuery(`*[_type == "event" && defined(slug.current)] | order(date asc){
  _id,
  title,
  slug,
  performer,
  date,
  startTime,
  endTime,
  location,
  tag,
  image,
  content
}`)

// events by date range
export const EVENTS_BY_DATE_QUERY =
  defineQuery(`*[_type == "event" && defined(slug.current) && date >= $startDate && date <= $endDate] | order(date asc){
  _id,
  title,
  slug,
  performer,
  date,
  startTime,
  endTime,
  location,
  tag,
  image,
  content
}`)

// person queries
export const TEAM_QUERY = defineQuery(`*[_type == "person" && category == "team"]{
  _id,
  name,
  image,
  email,
  phone,
  jobTitle
}`)

export const PRAKTIKANTER_QUERY = defineQuery(`*[_type == "person" && category == "praktikanter"]{
  _id,
  name,
  image,
  email,
  phone,
  jobTitle
}`)

// location queries
export const LOCATIONS_QUERY = defineQuery(`*[_type == "location"]{
  _id,
  name,
  image,
  link
}`)

// home page query (for home page content)
export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  _id,
  title,
  buyTickets1,
  buyTickets2,
  featuredNews[]->{
    _id,
    title,
    slug,
    tag,
    person,
    date,
    time,
    image,
    content
  },
  featuredEvents[]->{
    _id,
    title,
    slug,
    performer,
    date,
    startTime,
    endTime,
    location,
    tag,
    image,
    content
  }
}`)

// page query (for static pages like /billetter, /info, /kart)
export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  content
}`)

// contact/settings query
export const CONTACT_QUERY = defineQuery(`*[_type == "contact"][0]{
  _id,
  name,
  email,
  phone,
  jobTitle,
  visitingAddress,
  postalAddress,
  facebookUrl,
  instagramUrl
}`)

// limited queries for home page components
export const LIMITED_NEWS_QUERY =
  defineQuery(`*[_type == "news" && defined(slug.current)] | order(date desc)[0...$limit]{
  _id,
  title,
  slug,
  tag,
  person,
  date,
  time,
  image
}`)

export const LIMITED_EVENTS_QUERY =
  defineQuery(`*[_type == "event" && defined(slug.current)] | order(date asc)[0...$limit]{
  _id,
  title,
  slug,
  performer,
  date,
  startTime,
  endTime,
  location,
  tag,
  image
}`)
