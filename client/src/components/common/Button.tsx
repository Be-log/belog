import React from 'react'
import { styled } from 'styled-components'
import { BtnProps } from '../../interfaces/commonTypes'

const Button = ({ children, $color, $shape, onclick, disabled }: BtnProps) => {
  return (
    <CommonBtn type={'button'} $color={$color} $shape={$shape} onClick={onclick} disabled={disabled}>
      {children}
    </CommonBtn>
  )
}

export default Button

const CommonBtn = styled.button<BtnProps>`
  font-weight: 600;
  padding: 5px 15px;
  text-align: center;
  color: ${({ theme }) => theme.black};
  border-radius: ${({ $shape }) => ($shape === 'circle' ? '25px' : '3px')};
  ${({ $color, theme }) => {
    switch ($color) {
      case 'white':
        return `background-color: ${theme.darkWhite}; border: none;`
      case 'mint':
        return `background-color: ${theme.mint}; border: none;`
      case 'transparent':
        return `background-color: transparent; border: 1px solid ${theme.darkWhite}; color: ${theme.darkWhite};`
      default:
        return ''
    }
  }};
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    filter 0.2s ease;
  &:hover {
    color: ${({ $color }) => ($color === 'transparent' ? 'black' : '')};
    background: ${({ $color }) => ($color === 'transparent' ? 'white' : '')};
    filter: ${({ $color }) => ($color === 'transparent' ? '' : 'brightness(0.8)')};
  }
  &:disabled {
    filter: brightness(0.6);
  }
`
