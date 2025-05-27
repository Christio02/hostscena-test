import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '450px',
        phone: '720px',
        tablet: '990px',
        laptop: '1150px',
        desktop: '1440px',
      },
      fontFamily: {
        sans: ['var(--font-source)'],
        heading: ['var(--font-wittgenstein)'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
} satisfies Config
