import '../styles/globals.css'
import { Source_Sans_3, Wittgenstein } from 'next/font/google'
import Footer from '@/components/layout/footer/Footer'
import NavbarWrapper from '@/components/layout/navbar/NavbarWrapper'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  weight: ['300', '400', '500', '600', '700'],
})

const wittgenstein = Wittgenstein({
  subsets: ['latin'],
  variable: '--font-wittgenstein',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${sourceSans.variable} ${wittgenstein.variable}`}>
      <body className="font-sans">
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
