import type { ReactNode } from 'react'
import Spacer from '../Utilities/Spacer'

export interface FormFieldProps {
  title?: string
  description?: ReactNode
  children: ReactNode
}

export default function FormField({ title, description, children }: FormFieldProps) {
  return (
    <div>
      {title && (
        <>
          <span className="uppercase font-semibold text-sm text-gray-700 dark:text-gray-200">{title}</span>
          <Spacer size="half" />
        </>
      )}
      {description && (
        <>
          <p className="text-sm text-gray-700 dark:text-gray-500">{description}</p>
          <Spacer />
        </>
      )}
      {children}
    </div>
  )
}
