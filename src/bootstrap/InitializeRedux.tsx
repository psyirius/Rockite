import 'twin.macro'
import { internalPropertiesAppIsReady } from '$redux/selectors/internal-properties'
import type State from '$redux/state'
import config from '@/config'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import useInitializeRunCount from './hooks/useInitializeRunCount'
import useInitializeWindowId from './hooks/useInitializeWindowId'

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const themeChangeHandler = (isDark: boolean) => {
  // check localStorage for theme
  const theme = localStorage.getItem('theme')

  document.body.classList.remove('light')
  document.body.classList.remove('dark')

  if (!theme) {
    // follow system theme
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.add('light')
    }
  } else {
    if (JSON.parse(theme) === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.add('light')
    }
  }
}

darkModeMediaQuery.addEventListener('change', (e) => themeChangeHandler(e.matches))

themeChangeHandler(darkModeMediaQuery.matches)

export interface InitializeReduxProps {
  children: ReactNode
}

export default function InitializeRedux({ children }: InitializeReduxProps) {
  const storeReady = useSelector<State, boolean>((state) => state.internalProperties !== null)
  const reduxReady = useSelector<State, boolean>((state) => internalPropertiesAppIsReady(state))

  useInitializeRunCount(storeReady)
  useInitializeWindowId(storeReady)

  return reduxReady ? (
    <div tw="h-full">{children}</div>
  ) : (
    <AnimatePresence>
      {!reduxReady && (
        <div tw="h-full p-10" key="splash-overlay">
          <motion.div
            tw="flex flex-col h-full items-center justify-center"
            key="logo"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              tw="w-16 h-16 animate-bounce"
              srcSet={'/images/logo128.png 2x, /images/logo64.png 1x'}
              src="/images/logo64.png"
              alt={`${config.appName} logo`}
            />
            <p tw="my-4 font-semibold uppercase text-xs text-gray-600">{config.appName}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
