import NewsDetail from '@/components/layout/news/NewsDetail'
import { getCachedNewsBySlug } from '@/lib/sanity-cache'
import { notFound } from 'next/navigation'

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsItem = await getCachedNewsBySlug(slug)

  if (!newsItem) return notFound()

  return <NewsDetail news={newsItem} />
}
