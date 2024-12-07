import { internalPropertiesAppIsReady } from '$redux/selectors/internal-properties'
import type State from '$redux/state'
import config from '@/config'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import useInitializeRunCount from './hooks/useInitializeRunCount'
import useInitializeWindowId from './hooks/useInitializeWindowId'

export interface InitializeReduxProps {
  children: ReactNode
}

export default function InitializeRedux({ children }: InitializeReduxProps) {
  const storeReady = useSelector<State, boolean>((state) => state.internalProperties !== null)
  const reduxReady = useSelector<State, boolean>((state) => internalPropertiesAppIsReady(state))

  useInitializeRunCount(storeReady)
  useInitializeWindowId(storeReady)

  return reduxReady ? (
    <div className="h-full">{children}</div>
  ) : (
    <AnimatePresence>
      {!reduxReady && (
        <div className="h-full p-10" key="splash-overlay">
          <motion.div
            className="flex flex-col h-full items-center justify-center"
            key="logo"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              className="w-16 h-16 animate-bounce"
              srcSet={'/images/logo128.png 2x, /images/logo64.png 1x'}
              src="/images/logo64.png"
              alt={`${config.appName} logo`}
            />
            <p className="my-4 font-semibold uppercase text-xs text-gray-600">{config.appName}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
