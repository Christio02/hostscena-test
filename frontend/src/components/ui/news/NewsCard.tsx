import Image from 'next/image'

interface NewsCardProps {
  imageSrc: string
  title: string
}

export default function NewsCard({ imageSrc, title }: NewsCardProps) {
  return (
    <div className="w-full">
      <div className="relative w-full h-[190px] mobile:h-[260px]">
        <Image src={imageSrc} alt={title} fill className="object-cover w-full" priority />
      </div>
      <div className="px-[10px] py-[10px] h-[45px] flex items-center border border-secondary border-t-0">
        <p className="text-h6 w-full">{title}</p>
      </div>
    </div>
  )
}
