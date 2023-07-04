import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Editor } from '@toast-ui/react-editor'
import { TitleInput, WriteTitleInput, StyledButton } from '../components/styles'
import axios from 'axios'
import Cookies from 'universal-cookie'
import ReactMarkdown from 'react-markdown';


function Edit() {
  const location = useLocation()
  const { post, postId } = location.state
  const cookies = new Cookies()
  const accesstoken = cookies.get('accesstoken')
  const refreshtoken = cookies.get('refreshtoken')

  const [title, setTitle] = useState(post.post.title)
  const [content, setContent] = useState(post.post.content)


  const detailEdit = async () => {
    try {
      const { data } = await axios.put(
        `http://3.34.52.229/api/posts/${postId}`, {
        title,
        content
      },
        {
          headers: {
            accesstoken: `Bearer ${accesstoken}`,
            refreshtoken: `Bearer ${refreshtoken}`,
          },
        }
      )
      console.log('수정 완료:', data)
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value)
  }

  const handleUpdateClick = () => {
    console.log(typeof (content))
    detailEdit()
  }

  return (
    <>
      <TitleInput>
        <WriteTitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          style={{ color: 'black' }}
        />
      </TitleInput>

      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        initialValue={content}
        onChange={handleContentChange}
        bodyStyle={{
          backgroundColor: 'white',
          color: '#000',
          fontFamily: "'Noto Sans KR', sans-serif",
        }}
      />
      <ReactMarkdown>{content}</ReactMarkdown>

      <button onClick={handleUpdateClick}>수정</button>
    </>
  )
}

export default Edit