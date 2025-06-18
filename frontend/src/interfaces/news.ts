import { PortableTextBlock } from '@portabletext/types'
import { SanityImage } from './sanityImage'

export default interface News {
  slug: {
    _id: string
    current: string
  }
  image: SanityImage
  title: string
  tag?: string
  person?: string
  date: string
  time: string
  content?: PortableTextBlock[]
}
