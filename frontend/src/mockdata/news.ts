import News from '@/interfaces/news'
import slugify from '@/utils/slugify'

const rawNews = [
  {
    image: '/assets/images/newsMock/news1.png',
    title: 'PUBLIKUMSVERKTURUS 15 MARS I ÅLESUND',
    tag: 'Arrangement',
    person: 'Høstscena Ensemblet',
    date: '2025-03-15',
    time: '18:00',
  },
  {
    image: '/assets/images/newsMock/news2.png',
    title: 'FRIVILLIG PÅ HØSTSCENA',
    tag: 'Frivillig',
    person: 'Festivalteam',
    date: '2025-05-10',
    time: '17:00',
  },
  {
    image: '/assets/images/newsMock/news3.png',
    title: 'FAGSEMINAR UKE 4 MOLDE',
    tag: 'Fagseminar',
    person: 'Ulike gjester',
    date: '2025-04-05',
    time: '10:00',
  },
  {
    image: '/assets/images/newsMock/news4.png',
    title: 'FESTIVALFILM 2024',
    tag: 'Film',
    person: 'Filmcrew Høstscena',
    date: '2024-12-01',
    time: '20:00',
  },
  {
    image: '/assets/images/newsMock/news5.png',
    title: 'FESTIVALTEASER 2024',
    tag: 'Film',
    person: 'Produksjonsteamet',
    date: '2024-11-15',
    time: '12:00',
  },
  {
    image: '/assets/images/newsMock/news6.png',
    title: 'BOKSEGALLA',
    tag: 'Litteratur',
    person: 'Forfattere',
    date: '2025-06-01',
    time: '19:00',
  },
  {
    image: '/assets/images/newsMock/news1.png',
    title: 'FILMFESTIVAL',
    tag: 'Festival',
    person: 'Norske regissører',
    date: '2025-09-21',
    time: '16:00',
  },
  {
    image: '/assets/images/newsMock/news2.png',
    title: 'PRESSEKONFERANSE',
    tag: 'Presse',
    person: 'Høstscena',
    date: '2025-01-10',
    time: '10:00',
  },
]

const mockNews: News[] = rawNews.map(n => ({
  ...n,
  slug: slugify(n.title),
}))

export default mockNews