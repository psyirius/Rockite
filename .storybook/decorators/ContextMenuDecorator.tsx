import { ContextMenuProvider } from '$providers/ContextMenuProvider.tsx';

export default function ContextMenuDecorator(
  component: any,
) {
  return (
    <ContextMenuProvider>
      {component()}
    </ContextMenuProvider>
  )
}
