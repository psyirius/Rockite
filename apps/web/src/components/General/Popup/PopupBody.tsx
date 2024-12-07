import type { ReactNode } from 'react'

export interface PopupBodyProps {
  children: ReactNode
}

export default function PopupBody({ children }: PopupBodyProps) {
  return <div className="p-4">{children}</div>
}
