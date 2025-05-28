import NewsGrid from '@/components/ui/news/NewsGrid'
import mockNews from '@/mockdata/news'
import ImageSnake from '@/components/ui/imageSnake/ImageSnake'
import BlackTitleBar from '@/components/ui/blackTitleBar/BlackTitleBar'
import HomeHeader from '@/components/layout/navbar/homepage/HomeHeader'
import HomeNavbar from '@/components/layout/navbar/homepage/HomeNavbar'
import HomeMobileNavbar from '@/components/layout/navbar/homepage/HomeMobileNavbar'
import BuyFestivalPassHome from '@/components/ui/buyFestivalPass/BuyFestivalPassHome'
import BuyFestivalPass from '@/components/ui/buyFestivalPass/BuyFestivalPass'
import { buyTickets1, buyTickets2 } from '@/mockdata/text'
import ProgramContainer from "@/components/ui/program/ProgramContainer";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <ImageSnake />
      <HomeNavbar />
      <HomeMobileNavbar />
        {/*<BlackTitleBar title="Billetter" linkText="mer info" linkUrl="/billetter" />*/}
      <BuyFestivalPassHome
        imageSrc="/assets/images/snake/Hostscena-bildeslange-bilde07.jpg"
        button={
          <button className="btn font-wittgenstein text-nowrap text-[3.688rem] px-[26px] py-[13px]">
            Kjøp festivalpass her
          </button>
        }
      />
        <BlackTitleBar
            title="Program"
            linkText="alle arrangementer"
            linkUrl="/program"
            hideLinkOnMobile={true}
        />
        <ProgramContainer />
      <BuyFestivalPass
        imageSrc="/assets/images/snake/Hostscena-bildeslange-bilde07.jpg"
        className="min-h-[300px] block tablet:hidden w-full"
        button={
          <button className="btn font-wittgenstein max-w-[594px] text-nowrap text-h4 tablet:!text-[3.688rem] px-[20px] tablet:px-[26px] py-[10px] tablet:py-[13px]">
            Kjøp festivalpass her
          </button>
        }
        content={
          <div className="bg-white flex flex-col gap-[40px] p-[20px] font-source text-[1.188rem] tablet:max-w-[594px] tablet:border border-secondary">
            <p>{buyTickets1}</p>
            <p>{buyTickets2}</p>
          </div>
        }
      />
      <BlackTitleBar title="Nyheter" linkText="alle nyheter" linkUrl="/nyheter" />
      <NewsGrid news={mockNews} limitMobile={3} limitTablet={4} limitDesktop={6} />
    </>
  )
}
