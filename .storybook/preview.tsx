import type { Preview } from '@storybook/react'
import { fn } from '@storybook/test'

import GlobalStyles from '$components/General/Styled/GlobalStyles'

const preview: Preview = {
  parameters: {
    actions: {
      onClick: fn(),
    },
  },
  decorators: [
    (Story) => (
      <>
        <GlobalStyles backgroundColor="white" />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
}

export default preview
