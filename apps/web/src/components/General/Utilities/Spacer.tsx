import { cn } from '$lib/utils'

export interface SpacerProps {
  size?: 'half' | 'default'
}

export default function Spacer({ size = 'default' }: SpacerProps) {
  return <div className={cn('w-full', size === 'half' && 'py-1', (size === 'default' || !size) && 'py-2')} />
}
