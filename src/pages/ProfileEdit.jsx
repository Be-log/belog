import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MypageHeaderImg } from '../components/styles'
import useInputState from '../hook/useInputState'
import styled from 'styled-components'
import {
  MainContainer,
  MypageHeader,
  MypageHeaderLine,
  MypageHeaderTextContainer,
  MypageH2,
  MypageSpan,
  ProfileContainer,
  ProfileImg,
  ProfileContainerHeader,
  ProfileContainerBody,
  ProfileContainerBodyMenu
} from '../components/styles'
import Header from './Navbar'
import { useLocation } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { setLoginUser } from '../redux/modules/login'
import Button from '../components/Button'

function ProfileEdit() {
  const location = useLocation()
  const myProfileInfo = location.state.loginInfo
  const dispatch = useDispatch()

  const [image, setImage] = useState(null)

  const [email, newEmail, handleEmailChange, handleEmailEdit] = useInputState(myProfileInfo.email)
  const [github, newGitHub, handleGitHubChange, handleGitHubEdit] = useInputState(myProfileInfo.github)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setImage(null);
  }

  const cookies = new Cookies()
  const accesstoken = cookies.get('accesstoken')
  const refreshtoken = cookies.get('refreshtoken')

  const profileEdit = async (field, value) => {
    try {
      const { data } = await axios.put(
        'http://15.164.232.59/api/auth/profile',
        { [field]: value },
        {
          headers: {
            accesstoken: `Bearer ${accesstoken}`,
            refreshtoken: `Bearer ${refreshtoken}`
          }
        }
      )
      newProfile()
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }


  const newProfile = async () => {
    try {
      const { data } = await axios.get('http://15.164.232.59/api/auth/profile', {
        headers: {
          accesstoken: `Bearer ${accesstoken}`,
          refreshtoken: `Bearer ${refreshtoken}`,
        },
      })
      const { userInfo } = data
      dispatch(setLoginUser(userInfo))
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }
  useEffect(() => {
    newProfile()
  }, [myProfileInfo])


  useEffect(() => {
    if (email !== myProfileInfo.email) {
      profileEdit('email', email)
    }
  }, [email, myProfileInfo.email])

  useEffect(() => {
    if (github !== myProfileInfo.github) {
      profileEdit('github', github)
    }
  }, [github, myProfileInfo.github])


  return (
    <>
      <Header />
      <MainContainer>
        <ProfileContainer>
          <MypageHeader>
            <MypageHeaderImg src={`${process.env.PUBLIC_URL}/images/default_profile.png`} alt="" />
            <MypageHeaderTextContainer>
              <MypageH2>{myProfileInfo.nickname}님의 프로필</MypageH2>
              <MypageSpan>{myProfileInfo.description}</MypageSpan>
            </MypageHeaderTextContainer>
          </MypageHeader>
          <MypageHeaderLine />
          <ProfileContainerBody>
            <ProfileContainerBodyMenu>
              <div>
                <h2>Email</h2>
                <p>현재 이메일: {email}</p>
              </div>
              <MiddleInput
                type="text"
                value={newEmail}
                onChange={handleEmailChange}
                placeholder="새로운 이메일을 입력하세요"
              />
              <Button
                color={'mint'}
                onClick={() => {
                  handleEmailEdit(`Email을 [${newEmail}]으로 바꿀까요?`)
                  profileEdit('email', newEmail)
                }}
              >
                수정하기
              </Button>
            </ProfileContainerBodyMenu>
            <ProfileContainerBodyMenu>
              <div>
                <h2>GitHub 주소</h2>
                <p>현재 주소: {github}</p>
              </div>
              <MiddleInput
                type="text"
                value={newGitHub}
                onChange={handleGitHubChange}
                placeholder="새로운 GitHub 주소를 입력하세요"
                style={{
                  marginLeft: '-40px'
                }}
              />
              <Button
                color={'mint'}
                onClick={() => {
                  handleGitHubEdit(`GitHub 주소를 [${newGitHub}]로 바꿀까요?`)
                  profileEdit('github', newGitHub)
                }}
              >
                수정하기
              </Button>
            </ProfileContainerBodyMenu>
          </ProfileContainerBody>
      </ProfileContainer>
    </MainContainer>
    </>
  )

}

export default ProfileEdit

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
