import Image from 'next/image'
import Link from 'next/link'
import type Location from '@/interfaces/location'

interface Props {
  location: Location
}

export default function LocationCard({ location }: Props) {
  const { name, image, link } = location

  const Wrapper = link ? Link : 'div'

  return (
      <Wrapper href={link ?? '#'}>
        <div className="w-[172px]">
          <div className="relative w-full h-[221px] tablet:hover-lift">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
            />
          </div>
          <p className="text-2s mt-[10px]">{name}</p>
        </div>
      </Wrapper>
  )
}