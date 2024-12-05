import FormikDecorator, { type FormikDecoratorProps } from ':storybook/decorators/FormikDecorator'
import type { Meta, StoryFn } from '@storybook/react'
import FormField, { type FormFieldProps } from './FormField'
import { Filled as FormTextInput } from './FormTextInput.stories'

export default {
  title: 'Form / Form Field',
  component: FormField,
  argTypes: {},
  decorators: [FormikDecorator],
} as Meta

const Template: StoryFn<FormFieldProps & FormikDecoratorProps> = (args) => (
  <FormField {...args}>
    <FormTextInput name="test" initialValues={{ test: '' }} />
  </FormField>
)

export const WithDescription = Template.bind({})

WithDescription.args = {
  title: 'Field Title',
  description: 'Field Description or help text.',
}

export const WithoutDescription = Template.bind({})

WithoutDescription.args = {
  title: 'Field Title',
}
