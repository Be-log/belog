import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <WrapHeader>
      <section>
        <button type={'button'} onClick={() => navigate('/')}>
          {'belog'}
        </button>
      </section>
      <section>
        <button type={'button'}>{'로그인'}</button>
      </section>
    </WrapHeader>
  )
}

export default Header

const WrapHeader = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  section:nth-child(1) button {
    font-size: 26px;
    font-family: 'Source Code Pro', monospace;
  }
`
