import { StoryFn, Meta } from '@storybook/react';
import FormCheckbox, { FormCheckboxProps } from './FormCheckbox';
import FormikDecorator, { FormikDecoratorProps } from ':storybook/decorators/FormikDecorator';

export default {
  title: 'Form / Checkbox',
  component: FormCheckbox,
  argTypes: { },
  decorators: [
    FormikDecorator,
  ],
} as Meta;

const Template: StoryFn<FormCheckboxProps & FormikDecoratorProps> = (args) => (
  <FormCheckbox {...args} />
);

export const Primary = Template.bind({ });

Primary.args = {
  name: 'test',
  description: 'Test description',
  initialValues: {
    test: true,
  },
};
