import type PopupManager from '$types/UserInterface/PopupManager'
import { motion } from 'motion/react'
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

export interface PopupProps {
  popup: PopupManager
}

export default function Popup({ popup }: PopupProps) {
  return (
    <div
      role="presentation"
      onClick={() => popup.popToRoot()}
      className="flex justify-center overflow-y-auto py-10 items-start bg-gray-900 dark:bg-white fixed inset-0"
      style={{ background: 'rgba(0, 0, 0, .15)', backdropFilter: 'grayscale(50%)' }}
    >
      {/* Scale, Fly and Fade */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-white dark:bg-gray-900 w-full max-w-lg rounded overflow-hidden shadow-md dark:border dark:border-gray-700"
      >
        <div className="p-2 flex flex-row items-center justify-between bg-gray-800 dark:bg-gray-850 text-white">
          <div className="p-2 flex items-center uppercase text-sm font-semibold">
            {popup.title?.map((title, index) => (
              <React.Fragment key={title}>
                <span>{title}</span>
                {popup.title && index !== popup.title?.length - 1 && (
                  <span className="text-gray-500 text-base mx-2 inline-block">
                    <BsArrowRightShort />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            type="button"
            onClick={() => popup.popToRoot()}
            className="flex-grow-0 p-1 mr-2 hover:bg-gray-700 cursor-pointer rounded"
          >
            <MdClose />
          </button>
        </div>
        <div className="overflow-auto">{popup.component}</div>
      </motion.div>
    </div>
  )
}
