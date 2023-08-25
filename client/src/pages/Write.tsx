import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { styled } from 'styled-components'
import { Button } from '../components/common'

const Write = () => {
  const [content, setContent] = useState<string | undefined>('')

  return (
    <WrapWrite>
      <EditorSection>
        <WriteIpt type={'text'} placeholder={'제목을 입력하세요'} />
        <MDEditor value={content} onChange={setContent} height={600} />
      </EditorSection>
      <BtnSection>
        <button type={'button'}>{'＜ 뒤로가기'}</button>
        <Button $color={'mint'}>{'출간하기'}</Button>
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

const WriteIpt = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
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
