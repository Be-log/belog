import React, { useState, useRef, useEffect } from 'react'
import { useMutation } from 'react-query'
import { idDoubleChk, addUsers } from '../api/users'
import Button from '../components/Button'
import styled from 'styled-components'
import {
  Form,
  GuideTextP,
  InfoH1,
  ButtonDiv
} from './ModalStyle'

const Signup = ({ closeModalHandler }) => {
  const [guideText, setGuideText] = useState('');
  const [idChkState, setIdChkState] = useState({
    isIdCorrect: false,
    isIdDoubleChk: false,
  })
  const [submitState, setSubmitState] = useState(false)
  const [signupForm, setSignupForm] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
    email: '',
    github: '',
    description: '',
  })
  const passwordRef = useRef(null)

  // * guideText가 ''이면 (유효성 검증이 되면) 회원가입 버튼 활성화
  useEffect(() => {
    if (guideText === '') {
      setSubmitState(true)
    }
  }, [guideText]);

  // * input value onChange Handler
  const inputChangeHandler = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    })
  }

  // * 회원가입 입력값 유효성 검증
  const nicknameBlurHandler = (e) => {
    if (!(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,12}$/g).test(e.target.value)) {
      setGuideText(`영어 소문자 + 숫자로만 구성된 6~12자 이내 문자여야 합니다.`)
      setIdChkState({ isIdCorrect: false })
      setSubmitState(false)
    } else {
      setGuideText('');
      setIdChkState({ isIdCorrect: true })
    }
  }

  const passwordBlurHandler = (e) => {
    if (e.target.value.includes(`${signupForm.nickname}`)) {
      setGuideText(`비밀번호에는 아이디를 포함할 수 없습니다.`)
      setSubmitState(false)
    } else if (!(/^(?=.*[a-z])(?=.*[0-9])(?=.*[\W])[a-z\d\W]{6,12}$/g).test(e.target.value)) {
      setGuideText(`영어 소문자 + 숫자 + 특수문자로만 구성된 6~12자 이내 문자여야 합니다.`)
      setSubmitState(false)
    } else {
      setGuideText('')
    }
    passwordRef.current.focus()
  }

  const passwordCheckBlurHandler = (e) => {
    if (signupForm.password !== e.target.value) {
      setGuideText(`작성한 비밀번호가 일치하지 않습니다.`)
      setSubmitState(false)
    } else {
      setGuideText('')
    }
  }

  const emailBlurHandler = (e) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    if (!regex.test(e.target.value)) {
      setGuideText(`이메일이 형식에 맞지 않습니다.`)
      setSubmitState(false)
    } else {
      setGuideText('')
    }
  }

  const githubBlurHandler = (e) => {
    if (!(/^[a-zA-Z0-9]{6,20}$/g).test(e.target.value)) {
      setGuideText(`github 아이디가 형식에 맞지 않습니다.`)
      setSubmitState(false)
    } else {
      setGuideText('')
    }
  }

  const descriptionBlurHandler = (e) => {
    if (!(/^.{1,50}$/g).test(e.target.value)) {
      setGuideText(`블로그 소개는 1자 이상 50자 이내여야 합니다.`)
      setSubmitState(false)
    } else {
      setGuideText('')
    }
  }

  // * 아이디 중복확인 useMutation
  const idDoubleChkMutation = useMutation(idDoubleChk, {
    onSuccess: (response) => {
      console.log('id 중복체크', response)
    }
  })

  // * 아이디 중복확인 버튼 click
  const idDoubleChkHandler = (e) => {
    e.preventDefault()
    // const newNickname = {
    //   nickname: signupForm.nickname
    // }
    // idDoubleChkMutation.mutate(newNickname)

    // ! 23-05-09 22:03 일단 test로 true되도록 set
    setIdChkState({ isIdDoubleChk: true })

    // TODO
    // 중복된 값이 있으면 idChkState.isIdDoubleChk false 처리
    // 중복된 값 없으면 alert처리? (이 부분은 고민해볼 것)
    // guideText에 중복된 아이디 있음 안내
    // setSubmitState(false) 처리
  }

  // * 회원가입 유저 추가 useMutation
  const addUsersMutation = useMutation(addUsers, {
    onSuccess: (response) => {
      console.log('onSuccess 유저 등록 성공', response)
      alert('회원가입이 성공적으로 완료되었습니다!')
      closeModalHandler()
    }
  })

  // * 회원가입 버튼 click
  const submitClickHandler = (e) => {
    e.preventDefault()
    if (signupForm.nickname === '' || signupForm.password === '' || signupForm.password === '' ||
        signupForm.passwordCheck === '' || signupForm.email === '' || signupForm.github === '' ||
        signupForm.description === '' || guideText !== '') {
      setGuideText(`회원가입 입력 양식이 맞지 않습니다.`)
      setSubmitState(false)
      return
    } else if (!idChkState.isIdDoubleChk) {
      setGuideText(`아이디 중복확인을 진행해주세요.`)
      setSubmitState(false)
      return
    }

    const newUser = {
      nickname: signupForm.nickname,
      password: signupForm.password,
      userImage: `test.png`,
      email: signupForm.email,
      github: `https://github.com/${signupForm.github}`,
      description: signupForm.description,
    }

    addUsersMutation.mutate(newUser)
  }

  return (
    <FormDiv>
      <InfoH1>회원가입</InfoH1>
      <Form>
        <InputWrapper>
          <SmallInput
            name={'nickname'}
            size={'small'}
            value={signupForm.nickname}
            onBlur={nicknameBlurHandler}
            onChange={inputChangeHandler}
            placeholder={'아이디를 입력하세요.'}
          />
          <Button
            color={'mint'}
            onClick={idDoubleChkHandler}
            disabled={idChkState.isIdCorrect ? false : true}
          >
            중복확인
          </Button>
        </InputWrapper>
        <MiddleInput
          type={'password'}
          name={'password'}
          size={'medium'}
          value={signupForm.password}
          onBlur={passwordBlurHandler}
          onChange={inputChangeHandler}
          placeholder={'비밀번호를 입력하세요.'}
        />
        <MiddleInput
          type={'password'}
          name={'passwordCheck'}
          size={'medium'}
          value={signupForm.passwordCheck}
          onBlur={passwordCheckBlurHandler}
          onChange={inputChangeHandler}
          ref={passwordRef}
          placeholder={'비밀번호를 다시 입력해주세요.'}
        />
        <MiddleInput
          name={'email'}
          size={'medium'}
          value={signupForm.email}
          onBlur={emailBlurHandler}
          onChange={inputChangeHandler}
          placeholder={'이메일을 입력해주세요.'}
        />
        <MiddleInput
          name={'github'}
          size={'medium'}
          value={signupForm.github}
          onBlur={githubBlurHandler}
          onChange={inputChangeHandler}
          placeholder={'GitHub 아이디를 입력해주세요.'}
        />
        <MiddleInput
          name={'description'}
          size={'medium'}
          value={signupForm.description}
          onBlur={descriptionBlurHandler}
          onChange={inputChangeHandler}
          placeholder={'블로그 소개를 50자 이내로 입력해주세요.'}
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
          disabled={submitState ? false : true}
          onClick={submitClickHandler}
        >
          회원가입
        </Button>
      </ButtonDiv>
    </FormDiv>
  )
}

export default Signup

const FormDiv = styled.div`
  display: flex;
  margin-top: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SmallInput = styled.input`
  width: 200px;
  height: 45px;
  margin-right: 10px;
  padding: 0px 10px;
  float: left;
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