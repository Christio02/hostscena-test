import News from '@/interfaces/news'
import BlackTitleBar from '../blackTitleBar/BlackTitleBar'
import NewsGrid from './NewsGrid'

interface NewsProps {
  news: News[]
}
export default function NewsClient({ news }: NewsProps) {
  console.log('news:', news)
  return (
    <section>
      <BlackTitleBar title="Nyheter" />
      <NewsGrid news={news} />
    </section>
  )
}
