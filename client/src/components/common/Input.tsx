import { useState } from 'react'
import { styled } from 'styled-components'
import { IptProps } from '../../interfaces/commonTypes'

const Input = ({ type, id, $label, placeholder }: IptProps) => {
  // TODO recoil로 관리, 정규식은 상위컴포넌트에서 진행 후 error 여부 props로 처리
  const [iptValue, setIptValue] = useState('')

  return (
    <InputDiv>
      <div>
        <CommonLabel htmlFor={id}>{$label}</CommonLabel>
        {/* // TODO erroe T/F값에 따라 color 처리 */}
        <MessageP>{'에러 메세지'}</MessageP>
      </div>
      <CommonInput
        type={type}
        id={id}
        name={id}
        value={iptValue}
        onChange={(e) => setIptValue(e.target.value)}
        placeholder={placeholder}
      />
    </InputDiv>
  )
}

export default Input

const InputDiv = styled.div`
  width: 100%;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const MessageP = styled.p`
  font-size: 12px;
`

const CommonLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.gray};
`

const CommonInput = styled.input`
  width: 270px;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
  background: ${({ theme }) => theme.darkGray};
  border: 1px solid #4d4d4d;
  font-size: 14px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.mint};
    outline: none;
  }
`
