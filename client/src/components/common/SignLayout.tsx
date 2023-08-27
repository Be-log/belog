import { styled } from 'styled-components'
import { SignLayoutProps } from '../../interfaces/commonTypes'
import Image from './Image'
import { welcome } from '../../assets'

const SignLayout = ({ children }: SignLayoutProps) => {
  return (
    <BackgroundDiv>
      <WrapSign>
        <WelcomeSection>
          <Image $width={150} $height={100} src={welcome} />
          <p>{'환영합니다!'}</p>
        </WelcomeSection>
        <ChildrenSection>
          <CloseDiv>
            <button type={'button'}>{'×'}</button>
          </CloseDiv>
          <ChildrenForm>{children}</ChildrenForm>
        </ChildrenSection>
      </WrapSign>
    </BackgroundDiv>
  )
}

export default SignLayout

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

const ChildrenSection = styled.section`
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

const ChildrenForm = styled.form`
  //
`
