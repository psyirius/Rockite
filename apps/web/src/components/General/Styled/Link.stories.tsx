import type { Meta, StoryFn } from '@storybook/react'
import Link from './Link'

export default {
  title: 'Styled / Link',
  component: Link,
  argTypes: {},
} as Meta

const Template: StoryFn = (args) => <Link href="https://google.com">{args.children}</Link>

export const Primary = Template.bind({})

Primary.args = {
  children: 'Link Text',
}
