import GlobalStyles from '../src/components/General/Styled/GlobalStyles';

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
  decorators: [
      (Story) => (
          <>
            <GlobalStyles backgroundColor="white" />
            <Story />
          </>
      ),
  ],
  tags: ['autodocs']
};

export default preview;