import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie'
import { loginUsers } from '../api/users'
import { setLoginUser } from '../redux/modules/login'
import Button from '../components/Button'
import styled from 'styled-components'
import {
  Form,
  GuideTextP,
  InfoH1,
  ButtonDiv
} from './ModalStyle'
import { useEffect } from 'react'

const Login = ({ closeModalHandler }) => {
  const [guideText, setGuideText] = useState('')
  const [loginForm, setLoginForm] = useState({
    nickname: '',
    password: '',
  })

  const getLoginInfo = useSelector((state) => state.loginUser[0]);
  useEffect(() => {
    console.log(getLoginInfo)
  }, [getLoginInfo])

  // * react-cookie
  const cookies = new Cookies()

  // * react-redux useDispatch
  const dispatch = useDispatch()
  
  // * input value onChange Handler
  const inputChangeHandler = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    })
  }

  // * input value onBlur Handler
  const loginNicknameBlurHandler = (e) => {
    if (e.target.value === '') {
      setGuideText('아이디를 입력해주세요.')
      return
    } else {
      setGuideText('')
    }
  }

  const loginPasswordBlurHandler = (e) => {
    if (e.target.value === '') {
      setGuideText('비밀번호를 입력해주세요.')
      return
    } else {
      setGuideText('')
    }
  }

  // * 로그인 useMutation
  const loginUsersMutation = useMutation(loginUsers, {
    onSuccess: (response) => {
      cookies.set('loginToken', response.getAccesstoken)
      // * 로그인 유저 데이터 전역 관리
      dispatch(setLoginUser(response.userInfo))
      alert(`${loginForm.nickname}님 환영합니다!`)
      closeModalHandler()
    }
  })

  // * 로그인 버튼 click
  const loginBtnClickHandler = (e) => {
    e.preventDefault()
    if (loginForm.nickname === '' || loginForm.password === '') {
      setGuideText('로그인 정보를 입력해주세요.')
      return
    } else {
      setGuideText('')
    }
    
    const loginUser = {
      nickname: loginForm.nickname,
      password: loginForm.password,
    }

    loginUsersMutation.mutate(loginUser)
  }

  return (
    <>
      <FormDiv>
        <InfoH1>로그인</InfoH1>
        <Form>
          <MiddleInput
            name={'nickname'}
            size={'medium'}
            value={loginForm.nickname}
            onBlur={loginNicknameBlurHandler}
            onChange={inputChangeHandler}
            placeholder={'아이디를 입력하세요.'}
          />
          <MiddleInput
            name={'password'}
            type={'password'}
            size={'medium'}
            value={loginForm.password}
            onBlur={loginPasswordBlurHandler}
            onChange={inputChangeHandler}
            placeholder={'비밀번호를 입력하세요.'}
          />
        </Form>
        <GuideTextP>{guideText}</GuideTextP>
        <ButtonDiv>
          <Button
            type={'reset'}
            color={'white'}
          >
            초기화
          </Button>
          <Button
            color={'mint'}
            onClick={loginBtnClickHandler}
          >
            로그인
          </Button>
        </ButtonDiv>
      </FormDiv>
    </>
  )
}

export default Login

const FormDiv = styled.div`
  display: flex;
  margin-top: 160px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MiddleInput = styled.input`
  width: 300px;
  height: 45px;
  padding: 0px 10px;
  background-color: #1E1E1E;
  border: 1px solid #4D4D4D;
  border-radius: 3px;
  color: white;
  &:hover {
    border: 1px solid #96F2D7;
  }
  &:focus {
    outline: none;
    border: 1px solid #96F2D7;
  }
`