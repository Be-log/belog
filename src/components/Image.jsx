import React from 'react'
import styled from 'styled-components'

const Image = ({ width, height, src, alt }) => {
  const PropsImage = styled.img`
    ${() => sizeHandler(width, height)};
  `
  const sizeHandler = (width, height) => {
    return `width: ${width}px; height: ${height}px; border-radius: 50%;`
  }

  return (
    <PropsImage
      src={src}
      alt={alt}
    />
  )
}

export default Image