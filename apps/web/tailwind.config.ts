import type { Config } from 'tailwindcss'
import sharedConfig from '@rockite/tailwind-config'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'figtree': ['Figtree', 'sans-serif'],
      }
    },
  },
  presets: [sharedConfig],
} satisfies Config
