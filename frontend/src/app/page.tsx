import ImageSnake from '@/components/ui/imageSnake/imageSnake'
import BlackTitleBar from "@/components/ui/blackTitleBar/blackTitleBar";


export default function Home() {
  return (
    <div>
        {/*<ImageSnake />*/}
        <BlackTitleBar title="Nyheter" linkText="alle nyheter" linkUrl="/nyheter" />
    </div>
  )
}
