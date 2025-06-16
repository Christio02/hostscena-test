import { defineQuery } from 'next-sanity'

export const SINGLE_HOME_QUERY = defineQuery(`
  *[_type == "home"][0] {
    _id,
    _type,
    startDate,
    endDate,
    location,
    imageSnake[] {
      _key,
      alt,
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
    backgroundVideo {
      asset->{
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    }
  }
`)

// query for just the header info
export const HOME_HEADER_QUERY = defineQuery(`
  *[_type == "home"][0] {
  startDate,
  endDate,
  location
  }
`)

// query for the image snake
export const IMAGE_SNAKE_QUERY = defineQuery(`
  *[_type == "home"][0].imageSnake[] {
    _key,
    alt,
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
`)

// query for the background video
export const BACKGROUND_VIDEO_QUERY = defineQuery(`
  *[_type == "home"][0].backgroundVideo {
    asset->{
      _id,
      url,
      originalFilename,
      mimeType,
      size
    }
  }
`)
