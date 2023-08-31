import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { useMutation } from '@tanstack/react-query'
import { styled } from 'styled-components'
import { Button } from '../components/common'
import { setBoard } from '../api/board'
import { axiosErrorType } from '../interfaces/apiTypes'

const Write = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [isValidImg, setIsValidImg] = useState(false)
  const [content, setContent] = useState<string | undefined>('')

  // * Input onChange
  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onThumbnailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)

  useEffect(() => {
    isValidImgHandler(thumbnail)
  }, [thumbnail])

  // * 이미지 URL 유효성 검사
  const isValidImgHandler = (url: string) => {
    const img = new Image()
    img.onload = () => setIsValidImg(true)
    img.onerror = () => setIsValidImg(false)
    img.src = url
  }

  // * 게시글 작성 useMutation
  const setBoardMutation = useMutation(setBoard, {
    onSuccess: (response) => {
      alert(response.msg)
      navigate(`/post/${response.receiveData}`)
    },
    onError: (error: AxiosError<axiosErrorType>) => {
      alert(error.response?.data.msg)
    },
  })

  // * submitHandler
  const onBoardSubmitHandler = () => {
    if (!title.length || !content) {
      alert('입력되지 않은 값이 있습니다.')
      return
    }
    if (thumbnail && !isValidImg) {
      alert('유효하지 않은 이미지 URL입니다.')
      return
    }

    const boardData = {
      title,
      thumbnail,
      content,
    }
    setBoardMutation.mutate(boardData)
  }

  return (
    <WrapWrite>
      <EditorSection>
        <WriteLabel>
          {'게시글 제목'}
          <WriteIpt
            type={'text'}
            name={'title'}
            value={title}
            onChange={onTitleChangeHandler}
            maxLength={50}
            placeholder={'제목을 입력하세요.'}
          />
        </WriteLabel>
        <WriteLabel>
          {'썸네일 링크'}
          <WriteIpt
            type={'text'}
            name={'thumbnail'}
            value={thumbnail}
            onChange={onThumbnailChangeHandler}
            placeholder={'이미지 URL을 입력하세요.'}
          />
        </WriteLabel>
        <MDEditor
          value={content}
          onChange={setContent}
          height={510}
          textareaProps={{
            placeholder: '간단한 마크다운 문법을 이용해 게시글을 작성할 수 있습니다!',
          }}
          previewOptions={{
            allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'span', 'br', 'ul', 'li', 'ol', 'img'],
          }}
        />
      </EditorSection>
      <BtnSection>
        <button type={'button'} onClick={() => navigate(-1)}>
          {'＜ 뒤로가기'}
        </button>
        <Button $color={'mint'} onclick={onBoardSubmitHandler}>
          {'출간하기'}
        </Button>
      </BtnSection>
    </WrapWrite>
  )
}

export default Write

const WrapWrite = styled.main`
  margin: auto;
`

const EditorSection = styled.section`
  margin-top: 50px;
`

const WriteLabel = styled.label`
  margin: 30px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`

const WriteIpt = styled.input`
  width: 1600px;
  height: 50px;
  padding: 0 10px;
  background: #0d1117;
  border: 1px solid #2f353c;
  border-radius: 5px;
  font-size: 20px;
`

const BtnSection = styled.section`
  button {
    font-size: 20px;
    font-weight: 600;
  }
  padding: 50px 0 30px 0;
  display: flex;
  justify-content: space-between;
`
