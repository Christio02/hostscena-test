import type { PortableTextBlock } from '@portabletext/types'

interface Contributor {
  image: string
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

interface CarouselImage {
  image: string
  caption?: string
  alt?: string
}

export default interface Event {
  image: string
  title: string
  performer: string
  date: string
  startTime: string
  endTime: string
  location: string
  link?: string
  tag?: string
  slug: string
  content?: PortableTextBlock[]
  contributors?: Contributor[]
  video?: Video
  spotifyLink?: string
  imageCarousel?: CarouselImage[]
}
