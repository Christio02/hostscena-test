import { PortableTextBlock } from '@portabletext/types'

export default interface News {
  image: string
  title: string
  tag?: string
  person?: string
  date: string
  time: string
  slug: string
  content?: PortableTextBlock[]
}
