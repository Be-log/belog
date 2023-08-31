import { styled } from 'styled-components'
import { Image } from '../../components/common'
import { loading, errorImg } from '../../assets'
import { objType } from '../../interfaces/apiTypes'

const Loading = ({ type, page }: objType) => {
  return (
    <ErrorDiv $page={String(page)}>
      {type === 'loading' && <Image src={loading} $width={300} />}
      {type === 'error' && (
        <>
          <Image src={errorImg} />
          <h1>{'아무것도 없네요!'}</h1>
        </>
      )}
    </ErrorDiv>
  )
}

export default Loading

const ErrorDiv = styled.div<{ $page: string }>`
  width: ${({ $page }) => ($page === 'post' ? '1000px' : '1600px')};
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  img {
    width: 300px;
  }
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
`
