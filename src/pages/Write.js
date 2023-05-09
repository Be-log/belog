import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import React, { useRef, useCallback } from 'react'

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

  // const [formData, setFormData] = useState({
  //   title: '',
  //   content: '내용을 입력하세요',
  // });

  const [title, setTitle] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const content = contentRef.current.getInstance()
    console.log('title : ', title)
    console.log('editor : ', content.getMarkdown())

    await axios.post('http://3.34.52.229/api/posts', { title, content: content.getMarkdown() })
    console.log('제출되었습니다.')
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
