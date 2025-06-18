import BuyFestivalPass from '@/components/ui/buyFestivalPass/BuyFestivalPass'
import { ContactFooter } from '@/interfaces/contact'
import { createCachedSanityQuery } from '@/lib/sanity-cache'
import { FOOTER_CONTACT_QUERY } from '@/sanity/queries/contactInfo'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { HiArrowLongRight } from 'react-icons/hi2'
const logo = '/assets/images/logo/logo_no_border.svg'

const footerImage = '/assets/images/footer_image.png'

const getSocialIcon = (platform: string, size: number = 48) => {
  const iconProps = { size }

  switch (platform.toLowerCase()) {
    case 'facebook':
      return <FaFacebook {...iconProps} />
    case 'instagram':
      return <FaInstagram {...iconProps} />
    case 'youtube':
      return <FaYoutube {...iconProps} />
    case 'twitter':
    case 'x':
      return <FaTwitter {...iconProps} />
    case 'linkedin':
      return <FaLinkedin {...iconProps} />
    case 'tiktok':
      return <FaTiktok {...iconProps} />
    default:
      return <FaFacebook {...iconProps} />
  }
}

export default async function Footer() {
  const footerData = await createCachedSanityQuery<ContactFooter>(FOOTER_CONTACT_QUERY)()

  return (
    <footer className="pt-[60px] px-[20px]">
      <div className="tablet:border-t border-secondary flex flex-col tablet:flex-row tablet:justify-between">
        {/* Kontakt */}
        <div className="order-1 tablet:order-none tablet:pl-[20px] tablet:py-[30px] py-[20px] font-source flex gap-[20px] border-y border-secondary tablet:border-0">
          <div className="hidden tablet:block">
            <Image
              src={logo}
              alt="Logo"
              width={205}
              height={0}
              className="h-full border-secondary border-[1px] px-[14.4px] py-[13.6px]"
            />
          </div>
          <div className="w-[1px] h-full bg-black hidden tablet:block" />
          <div className="flex flex-col justify-center">
            <h2 className="text-h4">Kontakt:</h2>
            <p className="text-s">{footerData?.email}</p>
            <p className="text-s">{footerData?.address}</p>
            <p className="text-s">{footerData?.postbox}</p>
          </div>
        </div>

        {/* Festivalpass knapp */}
        <div className="order-2 tablet:order-3  flex items-center justify-center py-[20px] tablet:pr-[20px]">
          <BuyFestivalPass
            className="w-full tablet:w-[287px] h-[116px]"
            imageSrc={footerImage}
            button={
              <button className="btn font-wittgenstein text-[1.5rem] px-[20px] py-[10px] text-nowrap">
                <span className="flex items-center gap-[10px]">
                  Kjøp festivalpass
                  <HiArrowLongRight size={30} />
                </span>
              </button>
            }
          />
        </div>

        {/* Logo + SoMe (Mobile) */}
        <div className="order-3 tablet:order-none flex justify-between items-center gap-[20px] py-[20px] border-t border-secondary tablet:py-0 tablet:hidden">
          <Image
            src={logo}
            alt="Logo"
            width={125}
            height={0}
            className="border-secondary border-[1px] px-[8.77px] py-[8.29px]"
          />
          <div className="flex gap-[20px]">
            {footerData?.socialLinks?.map((sm, index) => (
              <a
                href={sm?.someUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                aria-label={`Visit our ${sm.platform} page`}
              >
                {getSocialIcon(sm.platform, 48)}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet SoMe */}
        <div className="hidden order-3 tablet:order-2 desktop:flex gap-[20px] justify-center items-center pr-[20px]">
          <div className="flex gap-[20px]">
            {footerData?.socialLinks?.map((sm, index) => (
              <a
                href={sm?.someUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                aria-label={`Visit our ${sm.platform} page`}
              >
                {getSocialIcon(sm.platform, 48)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
