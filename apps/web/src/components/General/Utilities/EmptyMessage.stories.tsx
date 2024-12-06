import type { Meta, StoryFn } from '@storybook/react'
import EmptyMessage, { type EmptyMessageProps } from './EmptyMessage'

export default {
  title: 'Utilities / Empty Message',
  component: EmptyMessage,
  argTypes: {},
} as Meta

const Template: StoryFn<EmptyMessageProps> = (args) => <EmptyMessage {...args}>{args.children}</EmptyMessage>

export const Primary = Template.bind({})

Primary.args = {
  heading: 'Title',
  children: 'Empty message content. Empty message content.',
}
