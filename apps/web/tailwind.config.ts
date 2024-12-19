import type { Config } from 'tailwindcss'
import sharedConfig from '@rockite/tailwind-config'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
  },
  presets: [sharedConfig],
} satisfies Config
