import isPlatform from '$helpers/isPlatform'
import { DropdownMenuContext } from '$providers/DropdownMenuProvider'
import type LabelClickAction from '$types/UserInterface/LabelClickAction'
import ButtonSecondary from '../General/Styled/ButtonSecondary'
import { createRef, useContext } from 'react'
import config from '@/config'
import logo16 from '@/assets/images/logo16.png'
import logo32 from '@/assets/images/logo32.png'
import logo64 from '@/assets/images/logo64.png'

const logoSrcSet = [
  `${logo64} 4x`,
  `${logo32} 2x`,
  `${logo16} 1x`,
]

export default function HeaderRightHandDropdown() {
  const dropdown = useContext(DropdownMenuContext)
  const buttonElement = createRef<HTMLButtonElement>()

  const linkActions: LabelClickAction[] = []

  if (!isPlatform('web')) {
    linkActions.push({
      label: 'Web',
      onClick: () => window.open(config.websiteLink, '_blank'),
    })
  }

  if (!isPlatform('chrome')) {
    linkActions.push({
      label: 'Chrome Extension',
      onClick: () => window.open(
        config.chromeWebStoreLink,
        '_blank',
      ),
    });
  }

  linkActions.push({
    label: 'Bugs and feature requests',
    onClick: () => window.open(config.issueTrackerLink, '_blank'),
  })

  return (
    <ButtonSecondary
      className="flex items-center text-xs text-gray-700 dark:text-gray-400 py-1.5 px-2 rounded"
      ref={buttonElement}
      onClick={() => dropdown.openForElement(buttonElement.current!, linkActions)}
    >
      <img
        className="mr-2 w-4 h-4"
        srcSet={logoSrcSet.join(', ')}
        src={logo16}
        alt={`${config.appName} logo`}
      />
      <span>{config.appName}</span>
    </ButtonSecondary>
  )
}
