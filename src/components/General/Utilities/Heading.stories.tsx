import { action } from '@storybook/addon-actions'
import type { Meta, StoryFn } from '@storybook/react'
import { MdAccessTime, MdAddLocation } from 'react-icons/md'
import Heading, { type HeadingProps } from './Heading'

export default {
  title: 'Utilities / Heading',
  component: Heading,
  argTypes: {
    buttons: { control: 'object' },
  },
} as Meta

const Template: StoryFn<HeadingProps> = (args) => <Heading {...args}>{args.children}</Heading>

export const WithoutButtons = Template.bind({})

WithoutButtons.args = {
  children: 'Heading',
  buttons: [],
}

export const WithButtons = Template.bind({})

WithButtons.args = {
  children: 'Heading',
  buttons: [
    {
      icon: <MdAccessTime />,
      alt: 'Clock',
      onClick: action('Clock click'),
    },
    {
      icon: <MdAddLocation />,
      alt: 'Location',
      onClick: action('Location click'),
    },
  ],
}
