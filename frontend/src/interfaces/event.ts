import type { PortableTextBlock } from '@portabletext/types'

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
}
