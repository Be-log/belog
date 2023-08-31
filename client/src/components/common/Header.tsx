import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { useMutation } from '@tanstack/react-query'
import { setSignOut } from '../../api/auth'
import Button from './Button'
import Portal from './Portal'

const Header = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [toggleAuth, setToggleAuth] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const authData = isLoggedInCheckHandler()
    setIsLoggedIn(authData.totalAuth)

    if (pathname === '/write' && !isLoggedIn) {
      alert(authData.msg)
      navigate('/')
    }
  })

  // * [로그인] toggle handler
  const toggleAuthHandler = () => setToggleAuth((prev) => !prev)

  // * [로그인] 로그인 여부 체크
  const isLoggedInCheckHandler = () => {
    const token = !!cookies.get('token') || false
    const id = !!localStorage.getItem('id') || false
    let msg = ''

    if (!token && id) {
      msg = '토큰이 만료되었습니다. 재로그인을 진행해주세요.'
    } else if (token && !id) {
      msg = '로그인 정보가 유효하지 않습니다. 재로그인을 진행해주세요.'
    } else if (!token && !id) {
      msg = '로그인 정보가 없습니다. 로그인을 진행해주세요.'
    }
    return {
      hasToken: token,
      hasId: id,
      totalAuth: token && id,
      msg,
    }
  }

  // * [로그아웃] useMutation
  const setSignOutMutation = useMutation(setSignOut, {
    onSuccess: (response) => {
      alert(response.msg)
      cookies.remove('token', { path: '/' })
      localStorage.clear()
      setIsLoggedIn(false)
    },
  })

  // * [로그아웃] signOut check handler
  const signOutHandler = () => setSignOutMutation.mutate()

  return (
    <WrapHeader>
      <section>
        <button type={'button'} onClick={() => navigate('/')}>
          {'belog'}
        </button>
      </section>
      <section>
        <LoggedInDiv>
          {isLoggedIn && pathname !== '/write' && (
            <Button $color={'white'} $shape={'circle'} onclick={() => navigate('/write')}>
              {'새 글 작성'}
            </Button>
          )}
          {isLoggedIn && (
            <Button $color={'transparent'} $shape={'circle'} onclick={signOutHandler}>
              {'로그아웃'}
            </Button>
          )}
        </LoggedInDiv>
        {!isLoggedIn && (
          <Button $color={'white'} $shape={'circle'} onclick={toggleAuthHandler}>
            {'로그인'}
          </Button>
        )}
      </section>
      {toggleAuth && <Portal type={'Authentication'} onclick={toggleAuthHandler} afteraction={toggleAuthHandler} />}
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
    font-family: 'source-code-pro', monospace;
  }
`

const LoggedInDiv = styled.div`
  display: flex;
  gap: 10px;
`
