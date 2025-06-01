import { notFound } from 'next/navigation'
import news from '@/mockdata/news'
import NewsDetail from '@/components/layout/news/NewsDetail'

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const newsItem = news.find((n: { slug: string }) => n.slug === params.slug)

  if (!newsItem) return notFound()

  return <NewsDetail news={newsItem} />
}
