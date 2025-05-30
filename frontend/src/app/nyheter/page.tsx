import NewsGrid from '@/components/ui/news/NewsGrid'
import mockNews from '@/mockdata/news'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'

export default function Nyheter() {
  return (
    <section>
      <BlackTitleBar title="Nyheter" />
      <NewsGrid news={mockNews} />
    </section>
  )
}
