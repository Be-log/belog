import { styled } from 'styled-components'
import { ImgProps } from '../../interfaces/commonTypes'
import { thumbnail } from '../../assets'

const Image = ({ $width, $height, $border, src, alt }: ImgProps) => {
  // * 이미지 로딩 실패 시 thumbnail 이미지로 대체
  const imgOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = event.currentTarget
    imgElement.src = thumbnail
  }

  return (
    <CommonImg
      $width={$width}
      $height={$height}
      $border={$border}
      src={src}
      alt={alt || `${src} image`}
      onError={imgOnErrorHandler}
    />
  )
}

export default Image

const CommonImg = styled.img<ImgProps>`
  ${({ $width, $height }) => `width: ${$width}px; height: ${$height}px;`};
  ${({ $border }) => `border-radius: ${$border}px;`};
  object-fit: contain;
`
