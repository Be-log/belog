import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Cookies } from 'react-cookie'
import { authState, signUpIptState } from '../../recoil/AuthAtom'
import { AuthenticationProps } from '../../interfaces/portalTypes'
import { Image, Input, Button } from '../../components/common'
import { welcome } from '../../assets'
import { setSignUp, setSignIn } from '../../api/Auth'
import { axiosErrorType } from '../../interfaces/apiTypes'

const Authentication = ({ onclick }: AuthenticationProps) => {
  const [toggleSign, setToggleSign] = useState({
    signIn: true,
    signUp: false,
  })
  const [iptValue, setIptValue] = useRecoilState(authState)
  const [iserrMsg, setIsErrMsg] = useState({
    status: false,
    msg: '',
  })
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true)
  const authValue = useRecoilValue(authState)
  const iptErrorValue = useRecoilValue(signUpIptState)
  const cookies = new Cookies()

  // * toggleSign false의 iptValue, isErrMsg초기화
  useEffect(() => {
    let cleanValue = {}
    if (toggleSign.signIn) {
      cleanValue = {
        id: '',
        pwd: '',
        nickname: '',
      }
    } else if (toggleSign.signUp) {
      cleanValue = {
        loginId: '',
        loginPwd: '',
      }
    }
    setIptValue((prev) => ({
      ...prev,
      ...cleanValue,
    }))
    setIsErrMsg({
      status: false,
      msg: '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleSign])

  // * 회원가입 모든 입력값 true인지 검증하여 회원가입 버튼 setIsSignUpDisabled
  useEffect(() => {
    const isEveryTrue = Object.values(iptErrorValue).every((value) => value)
    setIsSignUpDisabled(!isEveryTrue)
    setIsErrMsg({
      status: false,
      msg: '',
    })
  }, [iptErrorValue])

  // * 회원가입/로그인 구분 toggleSign
  const toggleSignHandler = (category: string) => {
    setToggleSign({
      signIn: category === 'signIn',
      signUp: category === 'signUp',
    })
  }

  // * [회원가입] useMutation
  const setSignUpMutation = useMutation(setSignUp, {
    onSuccess: (response) => {
      if (response.result) {
        alert(response.msg)
        toggleSignHandler('signIn')
      }
    },
    onError: (error: AxiosError<axiosErrorType>) => {
      setIsErrMsg({
        status: false,
        msg: error.response?.data.msg || '',
      })
      setIptValue((prev) => ({
        ...prev,
        id: '',
      }))
    },
  })

  // * [로그인] useMutation
  const setSignInMutation = useMutation(setSignIn, {
    onSuccess: (response) => {
      alert(response.msg)
      cookies.set('token', response.accessToken)
      localStorage.setItem('id', response.userId)
      localStorage.setItem('nickname', response.nickname)
    },
    onError: (error: AxiosError<axiosErrorType>) => {
      setIsErrMsg({
        status: false,
        msg: error.response?.data.msg || '',
      })
      setIptValue((prev) => ({
        ...prev,
        [error.response?.data.falseData || '']: '',
      }))
    },
  })

  // * submitHandler
  const onAuthSubmitHandler = (category: string) => {
    let authData = {}
    if (category === 'signIn') {
      authData = {
        ...authData,
        id: authValue.loginId,
        pwd: authValue.loginPwd,
      }
    } else if (category === 'signUp') {
      authData = {
        ...authData,
        id: authValue.id,
        pwd: authValue.pwd,
        nickname: authValue.nickname,
      }
    }

    const isEveryFill = Object.values<string>(authData).every((value) => value)
    if (!isEveryFill) {
      setIsErrMsg({
        status: false,
        msg: '입력되지 않은 값이 있습니다.',
      })
      return
    }

    if (category === 'signIn') {
      setSignInMutation.mutate(authData)
    } else if (category === 'signUp') {
      setSignUpMutation.mutate(authData)
    }
  }

  return (
    <BackgroundDiv>
      <WrapSign>
        <WelcomeSection>
          <Image $width={150} $height={100} src={welcome} />
          <p>{'환영합니다!'}</p>
        </WelcomeSection>
        <ChildrenForm>
          <CloseDiv>
            <button type={'button'} onClick={onclick}>
              {'×'}
            </button>
          </CloseDiv>
          <CategoryH1>{toggleSign.signIn ? '로그인' : '회원가입'}</CategoryH1>
          {toggleSign.signIn && (
            <>
              <Input type={'text'} id={'loginId'} $label={'아이디'} placeholder={'아이디를 입력해주세요.'} />
              <Input type={'password'} id={'loginPwd'} $label={'비밀번호'} placeholder={'비밀번호를 입력해주세요.'} />
              <SignInBtnWrapDiv>
                <Button $color={'mint'} onclick={() => onAuthSubmitHandler('signIn')}>
                  {'로그인'}
                </Button>
                <SubmitErrP>{iserrMsg.msg}</SubmitErrP>
                <div>
                  <span>{'아직 회원이 아니신가요?'}</span>
                  <button type={'button'} onClick={() => toggleSignHandler('signUp')}>
                    {'회원가입'}
                  </button>
                </div>
              </SignInBtnWrapDiv>
            </>
          )}
          {toggleSign.signUp && (
            <>
              <Input type={'text'} id={'id'} $label={'아이디'} placeholder={'3~12자의 영어 소문자'} />
              <Input type={'password'} id={'pwd'} $label={'비밀번호'} placeholder={'8~12자의 영어 소문자 및 숫자'} />
              <Input type={'text'} id={'nickname'} $label={'닉네임'} placeholder={'4~8자의 한글, 영문, 숫자'} />
              <SignUpBtnWrapDiv>
                <Button $color={'white'} onclick={() => toggleSignHandler('signIn')}>
                  {'뒤로가기'}
                </Button>
                <Button $color={'mint'} onclick={() => onAuthSubmitHandler('signUp')} disabled={isSignUpDisabled}>
                  {'회원가입'}
                </Button>
              </SignUpBtnWrapDiv>
              <SubmitErrP>{iserrMsg.msg}</SubmitErrP>
            </>
          )}
        </ChildrenForm>
      </WrapSign>
    </BackgroundDiv>
  )
}

export default Authentication

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`

const WrapSign = styled.div`
  width: 550px;
  height: 550px;
  display: flex;
`

const WelcomeSection = styled.section`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.deepGray};
  p {
    margin-top: 15px;
    font-size: 24px;
    font-weight: 600;
  }
`

const ChildrenForm = styled.form`
  width: 500px;
  padding: 20px 30px;
  background: ${({ theme }) => theme.black};
`

const CloseDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  button {
    font-size: 30px;
    color: ${({ theme }) => theme.gray};
  }
`

const CategoryH1 = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`

const SignInBtnWrapDiv = styled.div`
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-bottom: 90px;
  }
  div {
    display: flex;
    gap: 5px;
  }
  div button {
    color: ${({ theme }) => theme.mint};
    font-weight: 600;
  }
`

const SignUpBtnWrapDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const SubmitErrP = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: red;
  text-align: center;
`
