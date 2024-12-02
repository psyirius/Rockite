import FormikDecorator, {FormikDecoratorProps} from ':storybook/decorators/FormikDecorator';
import FormTextInput, { FormTextInputProps } from './FormTextInput';
import {StoryFn, Meta} from "@storybook/react";

export default {
  title: 'Form / Text Input',
  component: FormTextInput,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: StoryFn<FormTextInputProps & FormikDecoratorProps> = (args) => (
  <FormTextInput {...args} />
);

export const Filled = Template.bind({ });

Filled.args = {
  name: 'test',
  maxLength: 20,
  initialValues: {
    test: 'Value',
  },
};

export const Placeholder = Template.bind({ });

Placeholder.args = {
  name: 'test',
  maxLength: 50,
  placeholder: 'Placeholder',
  initialValues: {
    test: '',
  },
};
