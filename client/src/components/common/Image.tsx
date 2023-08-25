import { styled } from 'styled-components'
import { ImgProps } from '../../interfaces/commonTypes'

const Image = ({ $width, $height, $border, src, alt }: ImgProps) => {
  return <CommonImg $width={$width} $height={$height} $border={$border} src={src} alt={alt || `${src} image`} />
}

export default Image

const CommonImg = styled.img<ImgProps>`
  ${({ $width, $height }) => `width: ${$width}px; height: ${$height}px;`};
  ${({ $border }) => `border-radius: ${$border}px;`};
  object-fit: contain;
`
