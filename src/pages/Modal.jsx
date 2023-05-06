import React, { useState } from 'react'
import styled from 'styled-components'
import Join from './Join'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Modal = () => {
  const [form, setForm] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
    email: '',
    github: '',
    description: '',
    // ! 이미지 일단 default값으로 진행
  })

  // TODO 입력값 유효성 검증
  // * id : 영어 소문자 1개 이상 필수 및 숫자 포함해 6~12자 이하 문자열
  // * pwd : 6자 이상 ~ 12자 이하 영어 + 숫자 + 특문 최소 1개
  // * email : 이메일 형식 맞는지 검증
  // * github : github 아이디 입력 시 github 주소로 데이터 만들어서 보내기
  // * desc : 10자 이상, 50자 미만
  // * 전체 input 모두 필수 입력값
  // TODO

  return (
    <>
      <BackgroundDiv>
        <MainSection>
          <ImageDiv>
            <PopupImage src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg" alt="" />
            <PopupText>환영합니다!</PopupText>
          </ImageDiv>
          <InfoDiv>
            <InfoCloseP>
              <FontAwesomeIcon icon={faXmark} />
            </InfoCloseP>
            // TODO : 로그인 여부 파악해서 Join, Login으로 분기 처리
            <Join />
            {/* <Login /> */}
          </InfoDiv>
        </MainSection>
      </BackgroundDiv>
    </>
  )
}

export default Modal

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(18,18,18,0.6);
`

const MainSection = styled.section`
  width: 850px;
  height: 700px;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ImageDiv = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1E1E1E;
`

const PopupImage = styled.img`
  width: 170px;
  height: 170px;
`

const PopupText = styled.h1`
  color: #D9D9D9;
  font-size: 30px;
  font-weight: bold;
`

const InfoDiv = styled.div`
  width: 65%;
  background-color: #121212;
`

const InfoCloseP = styled.p`
  position: relative;
  top: 10px;
  left: 515px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`