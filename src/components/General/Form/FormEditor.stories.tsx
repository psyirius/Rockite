import { StoryFn, Meta } from '@storybook/react';
import FormEditor, { FormEditorProps } from './FormEditor';
import FormikDecorator, { FormikDecoratorProps } from ':storybook/decorators/FormikDecorator';

export default {
  title: 'Form / Editor',
  component: FormEditor,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: StoryFn<FormEditorProps & FormikDecoratorProps> = (args) => (
  <FormEditor {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  name: 'test',
  initialValues: {
    test: '{ "json": "payload" }',
  },
};
