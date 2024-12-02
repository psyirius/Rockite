import { DropdownMenuProvider } from '$providers/DropdownMenuProvider.tsx';

export default function DropdownMenuDecorator(
  component: any,
) {
  return (
    <DropdownMenuProvider>
      {component()}
    </DropdownMenuProvider>
  )
}
