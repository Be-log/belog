import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import React, { useRef, useCallback } from 'react'
import { Cookies } from 'react-cookie'
import {
  MainWidthDiv,
  MainContainer,
  WriteBtnSection,
  TitleInput,
  WriteTitleInput,
  EditorContainer,
} from '../components/styles'
import Button from '../components/Button'
import Header from './Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function Write() {
  const navigate = useNavigate()
  const contentRef = useRef(null);
  const handleFocus = useCallback(() => {
  }, [])

  const [title, setTitle] = useState('')

  const cookies = new Cookies()
  const accesstoken = cookies.get('accesstoken')
  const refreshtoken = cookies.get('refreshtoken')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const content = contentRef.current.getInstance()

    const postData = {
      title: title,
      content: JSON.stringify(content.getMarkdown())
    }

    try {
      await axios.post('http://3.34.52.229/api/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
          accesstoken: `Bearer ${accesstoken}`,
          refreshtoken: `Bearer ${refreshtoken}`
        }
      })
      alert('제출되었습니다.')
      navigate('/')
    } catch (error) {
      console.error('에러난다 :', error)
    }
  }

  // * 초기화 버튼 click
  const resetBtnClickHandler = (e) => {
    e.preventDefault()
    setTitle('')
    // postData.content = ''
  }

  return (
    <>
      <Header />
      <MainContainer>
        <MainWidthDiv>
          <form onSubmit={onSubmitHandler}>
            <TitleInput>
              <WriteTitleInput
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </TitleInput>
            <EditorContainer>
              <Editor
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                ref={contentRef}
                onFocus={handleFocus}
                bodyStyle={{
                  backgroundColor: "white",
                  color: "#000",
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              />
            </EditorContainer>

            <WriteBtnSection>
              <Button
                color={'white'}
                onClick={resetBtnClickHandler}
              >
                초기화
              </Button>
              <Button
                color={'mint'}
                onClick={onSubmitHandler}
              >
                작성하기
              </Button>
            </WriteBtnSection>
          </form>
        </MainWidthDiv>
      </MainContainer>
    </>
  )
}

export default Write
