import NewsClient from '@/components/ui/news/NewsClient'
import { getCachedNews } from '@/lib/sanity-cache'

export default async function Nyheter() {
  const news = await getCachedNews()
  return <NewsClient news={news} />
}
