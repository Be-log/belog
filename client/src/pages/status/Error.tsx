import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Image, Button } from '../../components/common'
import { errorImg } from '../../assets'

const Error = () => {
  const navigate = useNavigate()

  return (
    <WrapError>
      <Image src={errorImg} $width={300} />
      <h1>{'아무것도 없네요!'}</h1>
      <div>
        <Button $color={'mint'} onclick={() => navigate('/')}>
          {'홈으로'}
        </Button>
      </div>
    </WrapError>
  )
}

export default Error

const WrapError = styled.div`
  width: 1000px;
  height: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  h1 {
    font-size: 40px;
    font-weight: 600;
  }
  button {
    font-size: 20px;
  }
`
