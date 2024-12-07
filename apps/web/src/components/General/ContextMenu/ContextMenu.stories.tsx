import { action } from '@storybook/addon-actions'
import type { Meta, StoryFn } from '@storybook/react'
import ContextMenu, { type ContextMenuProps } from './ContextMenu'

export default {
  title: 'Context Menu',
  component: ContextMenu,
  argTypes: {
    actions: {
      control: {
        type: 'object',
      },
    },
    position: {
      control: {
        type: 'object',
      },
    },
  },
  decorators: [
    (component, { args }) => (
      <>
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full"
          style={{
            left: `calc(${args.position[0]}px - 0.5rem)`,
            top: `calc(${args.position[1]}px - 0.5rem)`,
          }}
        />
        {component()}
      </>
    ),
  ],
} as Meta

const Template: StoryFn<ContextMenuProps> = (args) => <ContextMenu {...args} />

export const Primary = Template.bind({})

Primary.args = {
  actions: [
    { label: 'Action 1', onClick: action('Action 1 click') },
    { label: 'Action 2', onClick: action('Action 2 click') },
    { label: 'Action 3', onClick: action('Action 3 click') },
  ],
  position: [200, 200],
  close: action('Close triggered'),
}
