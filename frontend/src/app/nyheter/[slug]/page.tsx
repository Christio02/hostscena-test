import NewsDetail from '@/components/layout/news/NewsDetail'
import news from '@/mockdata/news'
import { notFound } from 'next/navigation'

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = news.find((n: { slug: string }) => n.slug === slug)

  if (!newsItem) return notFound()

  return <NewsDetail news={newsItem} />
}
