import FormikDecorator, { type FormikDecoratorProps } from ':storybook/decorators/FormikDecorator'
import type { Meta, StoryFn } from '@storybook/react'
import FormEditor, { type FormEditorProps } from './FormEditor'

export default {
  title: 'Form / Editor',
  component: FormEditor,
  argTypes: {},
  decorators: [FormikDecorator],
} as Meta

const Template: StoryFn<FormEditorProps & FormikDecoratorProps> = (args) => <FormEditor {...args} />

export const Primary = Template.bind({})

Primary.args = {
  name: 'test',
  initialValues: {
    test: '{ "json": "payload" }',
  },
}
