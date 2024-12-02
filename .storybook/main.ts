import type { StorybookConfig } from '@storybook/react-vite'

export default {
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
    '@storybook/preset-create-react-app',
    '@storybook/addon-controls',
    '@chromatic-com/storybook'
  ],
  docs: {},
} satisfies StorybookConfig
