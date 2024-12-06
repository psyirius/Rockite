import isDarkMode from '$helpers/is-dark-mode'
import { cn } from '$lib/utils'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

// TODO: make it reactive to system dark mode changes

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', isDarkMode() ? Theme.Dark : Theme.Light)

  useEffect(() => {
    document.body.classList.remove(Theme.Light, Theme.Dark)
    document.body.classList.add(theme)
  }, [theme])

  const [lightMode, setLightMode] = useState(theme === Theme.Light)

  const handleThemeChange = (enabled: boolean) => {
    setTheme(enabled ? Theme.Light : Theme.Dark)
    setLightMode(enabled)
  }

  return (
    <Switch
      checked={lightMode}
      onChange={handleThemeChange}
      className={cn(
        lightMode ? 'bg-gray-200' : 'bg-gray-900',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={cn(
          lightMode ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-700 shadow ring-0 transition duration-200 ease-in-out',
        )}
      >
        <span
          className={cn(
            lightMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-gray-200" />
        </span>
        <span
          className={cn(
            lightMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
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
