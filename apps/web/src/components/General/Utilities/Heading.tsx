import { cn } from '$lib/utils'
import type { ReactElement, ReactNode } from 'react'
import ButtonSecondary from '../Styled/ButtonSecondary'

export interface HeadingProps {
  buttons?: {
    icon: ReactElement
    alt: string
    onClick: any
  }[]
  children: ReactNode
  className?: string
}

export default function Heading({ buttons, children, className }: HeadingProps) {
  return (
    <div className={cn('w-full flex bg-gray-200 dark:bg-gray-900 pl-4 pr-2', className)}>
      <div
        className="flex items-center flex-grow uppercase text-xs text-gray-800 dark:text-gray-100 font-semibold py-1 select-text"
        data-testid="title"
      >
        {children}
      </div>
      {buttons?.map((button) => (
        <ButtonSecondary
          type="button"
          key={button.icon + button.alt}
          className="p-2 cursor-pointer border-gray-300 text-xs rounded"
          title={button.alt}
          onClick={button.onClick}
        >
          {button.icon}
        </ButtonSecondary>
      ))}
    </div>
  )
}
