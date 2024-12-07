import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import animate from 'tailwindcss-animate'
import scrollbar from 'tailwind-scrollbar'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'

export default {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1500px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      gray: {
        50: '#FBFDFE',
        100: '#f7fafc',
        200: '#edf2f7',
        250: '#E8EDF4',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        850: '#242C3A',
        900: '#1a202c',
        950: '#0D1016'
      },
      red: {
        100: '#fff5f5',
        200: '#fed7d7',
        300: '#feb2b2',
        400: '#fc8181',
        500: '#f56565',
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a',
      },
      orange: {
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e',
      },
      yellow: {
        100: '#fffff0',
        200: '#fefcbf',
        300: '#faf089',
        400: '#f6e05e',
        500: '#ecc94b',
        600: '#d69e2e',
        700: '#b7791f',
        800: '#975a16',
        900: '#744210',
      },
      green: {
        100: '#f0fff4',
        200: '#c6f6d5',
        300: '#9ae6b4',
        400: '#68d391',
        500: '#48bb78',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
        900: '#22543d',
      },
      teal: {
        100: '#e6fffa',
        200: '#b2f5ea',
        300: '#81e6d9',
        400: '#4fd1c5',
        500: '#38b2ac',
        600: '#319795',
        700: '#2c7a7b',
        800: '#285e61',
        900: '#234e52',
      },
      blue: {
        100: '#F3F8FF',
        200: '#E6F1FE',
        300: '#B5D4FD',
        400: '#83B7FB',
        500: '#529BFA',
        600: '#207EF8',
        700: '#0764DF',
        800: '#054EAD',
        900: '#04387C'
      },
      indigo: {
        100: '#ebf4ff',
        200: '#c3dafe',
        300: '#a3bffa',
        400: '#7f9cf5',
        500: '#667eea',
        600: '#5a67d8',
        700: '#4c51bf',
        800: '#434190',
        900: '#3c366b',
      },
      purple: {
        100: '#FFFFFF',
        200: '#F1E7FE',
        300: '#D6B6FC',
        400: '#BB85FA',
        500: '#A054F8',
        600: '#8523F6',
        700: '#6C09DC',
        800: '#5407AB',
        900: '#3C057A'
      },
      pink: {
        100: '#fff5f7',
        200: '#fed7e2',
        300: '#fbb6ce',
        400: '#f687b3',
        500: '#ed64a6',
        600: '#d53f8c',
        700: '#b83280',
        800: '#97266d',
        900: '#702459',
      },
    },
    minWidth: {
      '0': '0',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '24-5': '24.5%',
      '32-5': '32.5%',
      '48-5': '48.5%',
      full: '100%',
    },
    extend: {
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'dm-mono': ['"DM Mono"', 'monospace'],
        'lexend': ['Lexend', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'figtree': ['Figtree', 'sans-serif'],
      },
      ringWidth: {
        '3000': '3000px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    forms({ strategy: 'class' }),
    typography({ className: 'prose' }),
    containerQueries,
    aspectRatio,
    scrollbar,
    animate,
  ],
} satisfies Omit<Config, "content">
