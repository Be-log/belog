import React, { useState } from 'react'
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

function ProfileEdit() {

  const location = useLocation()

  const myProfileInfo = location.state.loginInfo

  const [image, setImage] = useState(null)
  const [pageTitle, newTitle, handleTitleChange, handleTitleEdit] = useInputState("내 벨로그 제목")
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
          <ProfileContainerBodyMenu>
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
            <button onClick={() => handleTitleEdit(`벨로그 제목을 [${newTitle}]으로 바꿀까요?`)}>수정</button>
          </ProfileContainerBodyMenu>

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
            <button onClick={() => handleEmailEdit(`Email을 [${newEmail}]으로 바꿀까요?`)}>수정</button>
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
            <button onClick={() => handleGitHubEdit(`GitHub 주소를 [${newGitHub}]로 바꿀까요?`)}>수정</button>
          </ProfileContainerBodyMenu>
        </ProfileContainerBody>
      </ProfileContainer>
    </>
  )

}

export default ProfileEdit

