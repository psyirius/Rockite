import { createRef, useContext } from 'react'
import 'twin.macro'
import isPlatform from '$helpers/isPlatform'
import { DropdownMenuContext } from '$providers/DropdownMenuProvider'
import type LabelClickAction from '$types/UserInterface/LabelClickAction'
import config from '@/config'
import ButtonSecondary from '../General/Styled/ButtonSecondary'

export default function HeaderRightHandLinks() {
  const dropdown = useContext(DropdownMenuContext)
  const buttonElement = createRef<HTMLButtonElement>()

  const linkActions: LabelClickAction[] = []

  if (!isPlatform('web')) {
    linkActions.push({
      label: 'Web',
      onClick: () => window.open(config.websiteLink, '_blank'),
    })
  }

  // Make sure to uncomment this block after getting the Chrome extension published
  // if (!isPlatform('chrome')) {
  //   linkActions.push({
  //     label: 'Chrome Extension',
  //     onClick: () => window.open(
  //       config.chromeWebStoreLink,
  //       '_blank',
  //     ),
  //   });
  // }

  linkActions.push({
    label: 'Bugs and feature requests',
    onClick: () => window.open(config.issueTrackerLink, '_blank'),
  })

  return (
    <ButtonSecondary
      tw="flex items-center text-xs text-gray-700 dark:text-gray-400 py-1.5 px-2 rounded"
      ref={buttonElement}
      onClick={() => dropdown.openForElement(buttonElement.current!, linkActions)}
    >
      <img
        tw="mr-2 w-4 h-4"
        srcSet={`
          /images/logo64.png 4x,
          /images/logo32.png 2x,
          /images/logo16.png 1x
        `}
        src="/images/logo16.png"
        alt={`${config.appName} logo`}
      />
      <span>{config.appName}</span>
    </ButtonSecondary>
  )
}
