import type { ReactNode } from 'react'
import ButtonSecondary from '../Styled/ButtonSecondary'

export interface EmptyMessageProps {
  heading: string
  children: ReactNode
  buttonText?: string
  buttonOnClick?: () => void
}

export default function EmptyMessage({ heading, children, buttonText, buttonOnClick }: EmptyMessageProps) {
  return (
    <div className="flex content-center justify-center flex-wrap flex-grow select-text">
      <div className="text-center text-xs w-3/4 p-4 rounded-lg">
        <h3 className="font-bold mb-2 text-gray-600 dark:text-gray-300 text-sm uppercase" data-testid="heading">
          {heading}
        </h3>
        <p className="text-gray-800 dark:text-gray-500 mb-2" data-testid="description">
          {children}
        </p>
        {buttonText && buttonOnClick && (
          <ButtonSecondary type="button" className="px-2 py-1 rounded" onClick={() => buttonOnClick()}>
            {buttonText}
          </ButtonSecondary>
        )}
      </div>
    </div>
  )
}
