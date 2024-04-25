import { FC } from 'react'
import cn from 'classnames'

import { TIconName24 } from './_types'
import { TIconName16 } from './_types'

import { icons16, icons24 } from './_assets'

import s from './Icon.module.css'

interface IIcon24Props {
  icon: TIconName24;
  size: 24
}

interface IIcon16Props {
  icon: TIconName16;
  size: 16
}

export const Icon: FC<IIcon16Props | IIcon24Props> = ({
  icon,
  size,
}) => {
  const iconUrl = size === 16 ? icons16[`${icon}`] : icons24[`${icon}`]

  const iconStyle = { maskImage: `url(${iconUrl})` }

  return <i className={cn(s.icon, s[`icon__${size}`])} style={iconStyle} />
}
