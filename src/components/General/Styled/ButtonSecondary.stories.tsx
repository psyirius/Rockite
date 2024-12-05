import { action } from '@storybook/addon-actions'
import type { Meta, StoryFn } from '@storybook/react'
import ButtonSecondary from './ButtonSecondary'

export default {
  title: 'Styled / Button Secondary',
  component: ButtonSecondary,
} as Meta

const Template: StoryFn = (args) => <ButtonSecondary {...args}>{args.children}</ButtonSecondary>

export const Primary = Template.bind({})

Primary.args = {
  children: 'Button Text',
  disabled: false,
  onClick: action('Button click'),
}
