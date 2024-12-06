import { DropdownMenuProvider } from '$providers/DropdownMenuProvider'

export default function DropdownMenuDecorator(component: any) {
  return <DropdownMenuProvider>{component()}</DropdownMenuProvider>
}
