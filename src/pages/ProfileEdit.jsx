import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MypageHeaderImg } from '../components/styles'
import useInputState from '../hook/useInputState'
import {
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
import { updateProfile } from '../redux/modules/login'

function ProfileEdit() {
  const location = useLocation()
  const myProfileInfo = useSelector((state) => {
    // console.log(state)
    return state.loginUser
  })
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
        'http://15.164.232.59/api/auth/profile', { [field]: value },
        {
          headers: {
            accesstoken: `Bearer ${accesstoken}`,
            refreshtoken: `Bearer ${refreshtoken}`
          }
        }
      )
      console.log('put : ', data)
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
      console.log('get : ', data)
      dispatch(updateProfile({ loginUser: data.userInfo }))
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  useEffect(() => {
    newProfile()
  }, [])

  return (
    <>
      <Header />
      <ProfileContainer>
        <ProfileContainerHeader>
          <ProfileImg>
            <MypageHeaderImg src={image} alt="Profile" />
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleImageRemove}>이미지 제거</button>
          </ProfileImg>
          <div>
            <h1>{myProfileInfo.nickname}</h1>
            <span>{myProfileInfo.description}</span>
          </div>
        </ProfileContainerHeader>

        <ProfileContainerBody>
          {/* <ProfileContainerBodyMenu>
            <div>
              <h2>벨로그 제목</h2>
              <p>{pageTitle}</p>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="새로운 제목을 입력하세요"
            />
            <button
              onClick={() => {
                handleTitleEdit(`벨로그 제목을 [${newTitle}]으로 바꿀까요?`);
                profileEdit('title', newTitle);
              }}
            >
              수정
            </button>
          </ProfileContainerBodyMenu> */}

          <ProfileContainerBodyMenu>
            <div>
              <h2>Email</h2>
              <p>현재 이메일: {email}</p>
            </div>
            <input
              type="text"
              value={newEmail}
              onChange={handleEmailChange}
              placeholder="새로운 이메일을 입력하세요"
            />
            <button
              onClick={() => {
                handleEmailEdit(`Email을 [${newEmail}]으로 바꿀까요?`)
                profileEdit('email', newEmail)
              }}
            >
              수정
            </button>
          </ProfileContainerBodyMenu>

          <ProfileContainerBodyMenu>
            <div>
              <h2>GitHub 주소</h2>
              <p>현재 주소: {github}</p>
            </div>
            <input
              type="text"
              value={newGitHub}
              onChange={handleGitHubChange}
              placeholder="새로운 GitHub 주소를 입력하세요"
            />
            <button
              onClick={() => {
                handleGitHubEdit(`GitHub 주소를 [${newGitHub}]로 바꿀까요?`)
                profileEdit('github', newGitHub)
              }}
            >
              수정
            </button>
          </ProfileContainerBodyMenu>
        </ProfileContainerBody>
      </ProfileContainer>
    </>
  )

}

export default ProfileEdit

