import 'twin.macro';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react'
import State from '$redux/state';
import config from "@/config.ts";
import useInitializeRunCount from './hooks/useInitializeRunCount';
import useInitializeWindowId from './hooks/useInitializeWindowId';
import { internalPropertiesAppIsReady } from '$redux/selectors/internal-properties';

export interface InitializeReduxProps {
  children: ReactNode,
}

export default function InitializeRedux({
  children,
}: InitializeReduxProps) {
  const storeReady = useSelector<State, boolean>(
    (state) => (
      state.internalProperties !== null
    ),
  );

  const reduxReady = useSelector<State, boolean>(
    (state) => internalPropertiesAppIsReady(state),
  );

  useInitializeRunCount(storeReady);
  useInitializeWindowId(storeReady);

  return (
    <>
      {!reduxReady && (
          <div tw="h-full p-10">
            <motion.div
                tw="flex flex-col h-full items-center justify-center"
                initial={{scale: 0}}
                animate={{scale: 1}}
            >
              <img
                  tw="w-16 h-16 animate-bounce"
                  srcSet={`/images/logo128.png 2x, /images/logo64.png 1x`}
                  src="/images/logo64.png"
                  alt="WebSocket King logo"
              />
              <p tw="my-4 font-semibold uppercase text-xs text-gray-600">
                {config.appName}
              </p>
            </motion.div>
          </div>
      )}
      {reduxReady && children}
    </>
  );
}
