import type { FunctionComponent, ReactElement } from 'react'

export default interface PopupManager {
  visible: boolean
  title: string[] | null
  component: ReactElement | null
  popToRoot: () => void
  pop: (value?: any) => void
  push: <T>(title: string, component: FunctionComponent<any>, props?: any) => Promise<T>
}
