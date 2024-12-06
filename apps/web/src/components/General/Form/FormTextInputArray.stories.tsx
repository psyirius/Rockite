import FormikDecorator, { type FormikDecoratorProps } from ':storybook/decorators/FormikDecorator'
import type { Meta, StoryFn } from '@storybook/react'
import FormTextInputArray, { type FormTextInputArrayProps } from './FormTextInputArray'

export default {
  title: 'Form / Text Input Array',
  component: FormTextInputArray,
  argTypes: {},
  decorators: [FormikDecorator],
} as Meta

const Template: StoryFn<FormTextInputArrayProps & FormikDecoratorProps> = (args) => <FormTextInputArray {...args} />

export const Primary = Template.bind({})

Primary.args = {
  name: 'test',
  addItemCta: 'Add New Item',
  initialValues: {
    test: [
      { id: 'a', value: 'Test 1' },
      { id: 'b', value: 'Test 2' },
    ],
  },
}
