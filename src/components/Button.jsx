import React from 'react'
import styled from 'styled-components'

const Button = ({ color, shape, children }) => {
  const PropsButton = styled.button`
    ${() => colorHandler(color)};
    ${() => shapeHandler(shape)};
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      filter: brightness(80%);
    }
  `

  const colorHandler = (color) => {
    switch (color) {
      case 'white':
        return 'background-color: #F2F2F2; border: none;'
      case 'mint':
        return 'background-color: #96F2D7; border: none;'
      case 'transparent':
        return 'background-color: transparent; border: 1px solid #F2F2F2; color: #F2F2F2;'
      default:
        return '';
    }
  }

  const shapeHandler = (shape) => {
    switch (shape) {
      case 'circle':
        return 'border-radius: 25px; height: 40px;';
      default:
        return 'border-radius: 3px; height: 45px;';
    }
  }

  return (
    <>
      <PropsButton
      >
        {children}
      </PropsButton>
    </>
  )
}

export default Button