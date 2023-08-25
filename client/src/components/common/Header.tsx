import { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Portal from './Portal'

const Header = () => {
  const [toggleLogin, setToggleLogin] = useState(false)

  const navigate = useNavigate()

  const toggleLoginHandler = () => setToggleLogin((prev) => !prev)

  return (
    <WrapHeader>
      <section>
        <button type={'button'} onClick={() => navigate('/')}>
          {'belog'}
        </button>
      </section>
      <section>
        <Button $color={'transparent'} $shape={'circle'} onclick={toggleLoginHandler}>
          {'로그인'}
        </Button>
      </section>
      {toggleLogin && <Portal type={'SignUp'} />}
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
