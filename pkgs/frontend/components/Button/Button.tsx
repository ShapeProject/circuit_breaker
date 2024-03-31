import { type FC, memo } from 'react'
import React from 'react'

type Props = JSX.IntrinsicElements['button']

const Button: FC<Props> = (props) => {
  const { children, ...buttonProps } = props

  return (
    <button {...buttonProps}>{children}</button>
  )
}

export default memo(Button)
