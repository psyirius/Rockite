import { cn } from '$lib/utils'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import ButtonSecondary from '../General/Styled/ButtonSecondary'

export interface SidebarSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <label
      className={cn(
        'flex items-center bg-white dark:bg-gray-850 rounded-lg border-2 dark:border-gray-700',
        isFocused && 'border-gray-400 dark:border-gray-600',
      )}
    >
      <span className="sr-only">Filter</span>
      <input
        className="w-full bg-transparent py-1 px-4"
        type="text"
        value={value || ''}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInput={(event) => {
          onChange((event.target as HTMLInputElement).value)
        }}
        placeholder="Filter"
        maxLength={40}
      />
      {!!value?.length && (
        <ButtonSecondary type="button" className="mr-3 p-1" onClick={() => onChange('')}>
          <MdClose />
        </ButtonSecondary>
      )}
    </label>
  )
}
