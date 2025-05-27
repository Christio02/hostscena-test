import NewsGrid from '@/components/ui/news/NewsGrid'
import mockNews from '@/mockdata/news'
import ImageSnake from '@/components/ui/imageSnake/ImageSnake'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import HomeHeader from '@/components/layout/navbar/homepage/HomeHeader'
import HomeNavbar from '@/components/layout/navbar/homepage/HomeNavbar'
import HomeMobileNavbar from '@/components/layout/navbar/homepage/HomeMobileNavbar'

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <ImageSnake />
      <HomeNavbar />
      <HomeMobileNavbar />
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
