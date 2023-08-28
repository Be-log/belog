import { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Portal from './Portal'

const Header = () => {
  const [toggleAuth, setToggleAuth] = useState(false)

  const navigate = useNavigate()

  const toggleAuthHandler = () => setToggleAuth((prev) => !prev)

  return (
    <WrapHeader>
      <section>
        <button type={'button'} onClick={() => navigate('/')}>
          {'belog'}
        </button>
      </section>
      <section>
        <Button $color={'transparent'} $shape={'circle'} onclick={toggleAuthHandler}>
          {'로그인'}
        </Button>
      </section>
      {toggleAuth && <Portal type={'Authentication'} onclick={toggleAuthHandler} />}
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
