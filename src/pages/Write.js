import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import React, { useRef, useCallback } from 'react'

import {
  WriteBtnSection,
  WriteExitBtn,
  WriteSaveBtn,
  WriteTitleInput, // Added import for the title input
} from '../components/styles'

function Write() {
  const editorRef = useRef(null)
  const handleFocus = useCallback(() => {
    console.log('focus!!')
  }, [])

  return (
    <>
      <div>
        <WriteTitleInput type="text" placeholder="제목을 입력하세요" />
      </div>

      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        initialValue="내용을 입력하세요"
        ref={editorRef}
        onFocus={handleFocus}
      />

      <WriteBtnSection>
        <WriteExitBtn>나가기</WriteExitBtn>
        <WriteSaveBtn>출간하기</WriteSaveBtn>
      </WriteBtnSection>
    </>
  )
}

export default Write;
