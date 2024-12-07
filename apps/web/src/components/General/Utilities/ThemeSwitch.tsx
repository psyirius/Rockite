import { useThemeMode } from '$hooks/useThemeMode'
import { cn } from '$lib/utils'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

function ThemeSwitch() {
  const theme = useThemeMode((e) => e.theme)
  const { setMode } = useThemeMode()

  const [activeTheme, setActiveTheme] = useState(theme)

  useEffect(() => {
    setActiveTheme(theme)
  }, [theme])

  const handleThemeChange = (enabled: boolean) => {
    const theme = enabled ? 'light' : 'dark'

    setMode(theme)
    setActiveTheme(theme)
  }

  return (
    <Switch
      checked={activeTheme === 'light'}
      onChange={handleThemeChange}
      className={cn(
        {
          'bg-gray-200': activeTheme === 'light',
          'bg-gray-900': activeTheme === 'dark',
        },
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
      )}
    >
      <span className="sr-only">Theme Mode</span>
      <span
        className={cn(
          {
            'translate-x-5': activeTheme === 'light',
            'translate-x-0': activeTheme === 'dark',
          },
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-700 shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={cn(
            {
              'opacity-0 duration-100 ease-out': activeTheme === 'light',
              'opacity-100 duration-200 ease-in': activeTheme === 'dark',
            },
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-gray-200" />
        </span>
        <span
          className={cn(
            {
              'opacity-100 duration-200 ease-in': activeTheme === 'light',
              'opacity-0 duration-100 ease-out': activeTheme === 'dark',
            },
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-yellow-600" />
        </span>
      </span>
    </Switch>
  )
}

export default ThemeSwitch
