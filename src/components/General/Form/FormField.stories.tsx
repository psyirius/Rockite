import { StoryFn, Meta } from '@storybook/react';
import FormikDecorator, { FormikDecoratorProps } from ':storybook/decorators/FormikDecorator';
import { Filled as FormTextInput } from './FormTextInput.stories';
import FormField, { FormFieldProps } from './FormField';

export default {
  title: 'Form / Form Field',
  component: FormField,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: StoryFn<FormFieldProps & FormikDecoratorProps> = (args) => (
  <FormField {...args}>
    <FormTextInput name="test" initialValues={{ test: '' }} />
  </FormField>
);

export const WithDescription = Template.bind({ });

WithDescription.args = {
  title: 'Field Title',
  description: 'Field Description or help text.',
};

export const WithoutDescription = Template.bind({ });

WithoutDescription.args = {
  title: 'Field Title',
};
