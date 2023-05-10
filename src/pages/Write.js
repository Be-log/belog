import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import React, { useRef, useCallback } from 'react'
import { Cookies } from 'react-cookie'
import {
  WriteBtnSection,
  WriteExitBtn,
  WriteSaveBtn,
  WriteTitleInput,
} from '../components/styles'
import Header from './Navbar'
import { useState } from 'react'
import axios from 'axios'

function Write() {
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
      console.log('제출되었습니다.')
    } catch (error) {
      console.error('에러난다 :', error)
    }
  }


  return (
    <>
      <Header />
      <form onSubmit={onSubmitHandler}>
        <div>
          <WriteTitleInput
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <Editor
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          initialValue="나는 여기 데이터를 가져오고싶다.. "
          ref={contentRef}
          onFocus={handleFocus}
        />


        <WriteBtnSection>
          <WriteExitBtn>나가기</WriteExitBtn>
          <WriteSaveBtn type="submit">출간하기</WriteSaveBtn>
        </WriteBtnSection>
      </form>
    </>
  )
}

export default Write
