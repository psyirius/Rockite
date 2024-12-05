import { action } from '@storybook/addon-actions'
import type { Meta, StoryFn } from '@storybook/react'
import ButtonPrimary from './ButtonPrimary'

export default {
  title: 'Styled / Button Primary',
  component: ButtonPrimary,
} as Meta

const Template: StoryFn = (args) => <ButtonPrimary {...args}>{args.children}</ButtonPrimary>

export const Primary = Template.bind({})

Primary.args = {
  children: 'Button Text',
  disabled: false,
  onClick: action('Button click'),
}
