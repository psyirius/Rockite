import FormikDecorator, { type FormikDecoratorProps } from ':storybook/decorators/FormikDecorator'
import type { Meta, StoryFn } from '@storybook/react'
import FormCheckbox, { type FormCheckboxProps } from './FormCheckbox'

export default {
  title: 'Form / Checkbox',
  component: FormCheckbox,
  argTypes: {},
  decorators: [FormikDecorator],
} as Meta

const Template: StoryFn<FormCheckboxProps & FormikDecoratorProps> = (args) => <FormCheckbox {...args} />

export const Primary = Template.bind({})

Primary.args = {
  name: 'test',
  description: 'Test description',
  initialValues: {
    test: true,
  },
}
