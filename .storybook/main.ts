import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig ={
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@chromatic-com/storybook'
  ],
  docs: {},
  staticDirs: ['../public'],
}

export default config
