import type { PortableTextBlock } from '@portabletext/types'
import { SanityImage } from './sanityImage'

interface Contributor {
  image: SanityImage
  name: string
  artistType: string
  bio?: string
}

interface Video {
  title?: string
  videoType: 'youtube' | 'upload'
  youtubeUrl?: string
  videoFile?: string
}

export interface Slide {
  _key: string
  caption?: string
  alt?: string
  image: SanityImage
}

export default interface Event {
  slug: {
    _id: string
    current: string
  }
  image: SanityImage
  title: string
  performer: string
  date: string
  startTime: string
  endTime: string
  location: string
  link?: string
  tag?: string
  content?: PortableTextBlock[]
  contributors?: Contributor[]
  video?: Video
  spotifyLink?: string
  imageCarousel?: Slide[]
}
