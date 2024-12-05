import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

export interface GlobalStylesProps {
  backgroundColor?: string
}

const CustomStyles = createGlobalStyle<GlobalStylesProps>`
  body {
    ${tw`text-base select-none`}
  }
  
  #app {
    ${tw`h-screen text-sm`}
  }
  
  input:focus,
  select:focus,
  textarea:focus,
  button:focus,
  div[contenteditable]:focus {
    ${tw`outline-none!`}
  }

  .editor {
    .token {
      &.punctuation {
        color: ${theme`colors.gray.900`};
      }
      &.property {
        color: ${theme`colors.teal.700`};
      }
      &.operator {
        color: ${theme`colors.gray.700`};
      }
      &.string {
        color: ${theme`colors.blue.900`};
      }
    }
    
    .dark {
      .token {
        &.punctuation {
          color: ${theme`colors.gray.100`};
        }
        &.property {
          color: ${theme`colors.teal.300`};
        }
        &.operator {
          color: ${theme`colors.gray.300`};
        }
        &.string {
          color: ${theme`colors.blue.300`};
        }
      }
    }
  }
`

const GlobalStyles = (props: GlobalStylesProps) => (
  <>
    <BaseStyles />
    <CustomStyles {...props} />
  </>
)

export default GlobalStyles
