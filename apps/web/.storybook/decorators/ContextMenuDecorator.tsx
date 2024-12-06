import { ContextMenuProvider } from '$providers/ContextMenuProvider'

export default function ContextMenuDecorator(component: any) {
  return <ContextMenuProvider>{component()}</ContextMenuProvider>
}
