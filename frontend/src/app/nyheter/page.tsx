import NewsGrid from '@/components/ui/news/NewsGrid'
import mockNews from '@/mockdata/news'

export default function Nyheter() {
  return (
    <section>
      <NewsGrid news={mockNews} />
    </section>
  )
}
