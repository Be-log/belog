import { styled } from 'styled-components'
import { SignLayout, Input, Button } from '../../components/common'
import { PortalProps } from '../../interfaces/portalTypes'

const SignUp = ({ onclick }: PortalProps) => {
  return (
    <SignLayout>
      <SignUpH1>{'회원가입'}</SignUpH1>
      <Input type={'text'} id={'id'} $label={'아이디'} placeholder={'3~12자의 영어 소문자'} />
      <Input type={'text'} id={'pwd'} $label={'비밀번호'} placeholder={'8~12자의 영어 소문자 및 특수문자'} />
      <Input type={'password'} id={'pwdChk'} $label={'비밀번호 확인'} />
      <Input type={'text'} id={'nickname'} $label={'닉네임'} placeholder={'4~8자의 한글, 영문, 숫자'} />
      <BtnWrapDiv>
        <Button $color={'mint'}>{'회원가입'}</Button>
      </BtnWrapDiv>
    </SignLayout>
  )
}

export default SignUp

const SignUpH1 = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const BtnWrapDiv = styled.button`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
