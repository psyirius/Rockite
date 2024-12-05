import 'twin.macro'
import type { Meta, StoryFn } from '@storybook/react'
import Spacer, { type SpacerProps } from './Spacer'

export default {
  title: 'Utilities / Spacer',
  component: Spacer,
  decorators: [(story) => <div tw="w-full bg-gray-300">{story()}</div>],
} as Meta

const Template: StoryFn<SpacerProps> = (args) => <Spacer {...args} />

export const Primary = Template.bind({})

Primary.args = {
  size: 'default',
}
