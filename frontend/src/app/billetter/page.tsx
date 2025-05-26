import BuyFestivalPass from '@/components/ui/buyFestivalPass/BuyFestivalPass'
import { buyTickets1, buyTickets2 } from '@/mockdata/text'

export default function Billetter() {
  return (
    <section>
      <BuyFestivalPass
        imageSrc="/assets/images/snake/Hostscena-bildeslange-bilde07.jpg"
        className="min-h-[300px] tablet:h-[700px] w-full"
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
    </section>
  )
}
