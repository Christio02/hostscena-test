import News from '@/interfaces/news'
import slugify from '@/utils/slugify'

const getMockContent = (text1: string, text2: string, text3?: string, text4?: string) => ([
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: text1, marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: text2, marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: text3, marks: [] }],
    markDefs: [],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text: text4, marks: [] }],
    markDefs: [],
  },
])

const rawNews = [
  {
    image: '/assets/images/newsMock/news1.png',
    title: 'PUBLIKUMSVERKTURUS 15 MARS I ÅLESUND',
    tag: 'Arrangement',
    person: 'Høstscena Ensemblet',
    date: '2025-03-15',
    time: '18:00',
    content: getMockContent('Henders verk. Ein kan fort tenke at dette er eit tema som handlar om hender. Eller ein kan tenke at det handlar om produktet, resultatet, konsekvensen av det ein skaper med hendene. Handverket. Men i Røssevolds tolking av temaet har ho gripe tak i det som ligg mellom hender og verk, altså handlinga. Og ut frå dette har kunstneren valt å dvele ved tvetydige handlingar. Altså handlingar som kan vere ulike ting og ikkje berre ha eit resultat, eller ein konsekvens.    ', 'Ut frå dette har ho laga ei utstilling som ho har kalla Profeti. Utstillinga viser digre bevegelige figurar i papp som heng frå takbjelkane i Foajeen på Parken kulturhus. Figurane er montert saman med tråd og om ein dreg i trådane vil figurane sprelle og smelle kraftig med delane sine. Rundt omkring i rommet er det stilt ut ei rekke objekt som også er overdimensjonerte og laga i papp. Desse viser alle objekt som i si opprinnelege form skal brukast for å gjere ei handling. Objekta er laga av elevar frå KDA ved Ålesund videregående skole.  ',
        'I utstillinga skal det skje ulike hendingar kalt BOT og KAMP. Fredag 30.september blir det invitert til botshandling i utstillinga og laurdag 1.oktober blir det sett opp ein boksering i utstillinga. Kl 21.00 blir det boksekamp i regi av Ålesund bokseklubb. Seks boksarar gjennomfører tre kampar. Kampen er ein del av utstillinga. Og markerer slutten på utstillinga Profeti. Altså ein finnisage.',
        'Utstillinga er tilgjengeleg i kulturhusets opningstid.\n' +
        'Det er gratis inngang.\n' +
        'Publikum oppfordrast til å ta på / trekke i trådar/ og handsame verka som dei ønsker.'),
  },
  {
    image: '/assets/images/newsMock/news2.png',
    title: 'FRIVILLIG PÅ HØSTSCENA',
    tag: 'Frivillig',
    person: 'Festivalteam',
    date: '2025-05-10',
    time: '17:00',
    content: getMockContent('Vi søker frivillige til årets festival!', 'Send oss en melding dersom du vil bidra.'),
  },
  {
    image: '/assets/images/newsMock/news3.png',
    title: 'FAGSEMINAR UKE 4 MOLDE',
    tag: 'Fagseminar',
    person: 'Ulike gjester',
    date: '2025-04-05',
    time: '10:00',
    content: getMockContent('Fagseminar med spennende tema og foredragsholdere.', 'Arrangementet er åpent for alle.'),
  },
  {
    image: '/assets/images/newsMock/news4.png',
    title: 'FESTIVALFILM 2024',
    tag: 'Film',
    person: 'Filmcrew Høstscena',
    date: '2024-12-01',
    time: '20:00',
    content: getMockContent('Se tilbake på høydepunktene fra festivalen 2024.', 'Filmen vises i lokal kino og online.'),
  },
  {
    image: '/assets/images/newsMock/news5.png',
    title: 'FESTIVALTEASER 2024',
    tag: 'Film',
    person: 'Produksjonsteamet',
    date: '2024-11-15',
    time: '12:00',
    content: getMockContent('Få en sniktitt på årets festival.', 'Teaseren gir deg et glimt av hva som kommer.'),
  },
  {
    image: '/assets/images/newsMock/news6.png',
    title: 'BOKSEGALLA',
    tag: 'Litteratur',
    person: 'Forfattere',
    date: '2025-06-01',
    time: '19:00',
    content: getMockContent('Opplev litteraturens kraft i boksegallaen.', 'Forfattersamtaler og opplesninger kombineres her.'),
  },
  {
    image: '/assets/images/newsMock/news1.png',
    title: 'FILMFESTIVAL',
    tag: 'Festival',
    person: 'Norske regissører',
    date: '2025-09-21',
    time: '16:00',
    content: getMockContent('Bli med på feiringen av norsk film.', 'Flere visninger og samtaler med regissører.'),
  },
  {
    image: '/assets/images/newsMock/news2.png',
    title: 'PRESSEKONFERANSE',
    tag: 'Presse',
    person: 'Høstscena',
    date: '2025-01-10',
    time: '10:00',
    content: getMockContent('Velkommen til årets pressekonferanse.', 'Vi presenterer årets program og samarbeidspartnere.'),
  },
]

const mockNews: News[] = rawNews.map((n) => ({
  ...n,
  slug: slugify(n.title),
}))

export default mockNews