import NewsGrid from '@/components/ui/news/NewsGrid'
import mockNews from '@/mockdata/news'
import ImageSnake from '@/components/ui/imageSnake/ImageSnake'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'

export default function Home() {
  return (
    <div>
      <ImageSnake />
      <BlackTitleBar title="Nyheter" linkText="alle nyheter" linkUrl="/nyheter" />
      <NewsGrid news={mockNews} limitMobile={3} limitTablet={4} limitDesktop={6} />
      <BlackTitleBar
        title="Program"
        linkText="alle arrangementer"
        linkUrl="/program"
        hideLinkOnMobile={true}
      />
    </div>
  )
}
