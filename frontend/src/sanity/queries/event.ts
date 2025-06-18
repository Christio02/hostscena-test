import { defineQuery } from 'next-sanity'

export const EVENT_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc) {
    slug {
      _id,
      current
    },
    _type,
    title,
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    content,
    contributors[] {
      _key,
      name,
      artistType,
      bio,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    },
    video {
      title,
      videoType,
      youtubeUrl,
      videoFile {
        asset->{
          _id,
          url,
          originalFilename,
          mimeType
        }
      }
    },
    spotifyLink,
    imageCarousel[] {
      _key,
      caption,
      alt,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    }
  }
`)

// single event by id/slug
export const EVENT_BY_ID_QUERY = defineQuery(`
  *[_type == "event" && _id == $id][0] {
    _id,
    _type,
    title,
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    content,
    contributors[] {
      _key,
      name,
      artistType,
      bio,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    },
    video {
      title,
      videoType,
      youtubeUrl,
      videoFile {
        asset->{
          _id,
          url,
          originalFilename,
          mimeType
        }
      }
    },
    spotifyLink,
    imageCarousel[] {
      _key,
      caption,
      alt,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        hotspot,
        crop
      }
    }
  }
`)

// upcoming events
export const UPCOMING_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    _type,
    title,
    date,
    startTime,
    endTime,
    location,
    link,
    tag,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    }
  }
`)
