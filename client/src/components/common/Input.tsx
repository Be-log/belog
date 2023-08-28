import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useRecoilState } from 'recoil'
import { AuthState } from '../../recoil/AuthAtom'
import { IptProps, IptChangeType, errorMsgType, regexType } from '../../interfaces/commonTypes'
import { AuthStateType } from '../../interfaces/atomTypes'

const Input = ({ type, id, $label, placeholder }: IptProps) => {
  const [iptValue, setIptValue] = useRecoilState(AuthState)
  const [errorMsg, setErrorMsg] = useState({
    status: false,
    msg: '',
  })

  // * 입력값의 길이가 0이면 errorMsg 초기화
  useEffect(() => {
    if (iptValue[id as keyof AuthStateType]?.length === 0) {
      setErrorMsg({
        status: false,
        msg: '',
      })
    }
  }, [iptValue, id])

  // * Input onChange
  const onIptChangeHandler = ({ e, id }: IptChangeType) => {
    const newValue = e.target.value
    setIptValue((prev) => ({
      ...prev,
      [id]: newValue,
    }))
    regexHandler({ id, newValue })
  }

  // * setErrorMsg
  const errorMsgHandler = ({ status, msg }: errorMsgType) => {
    setErrorMsg({
      status,
      msg,
    })
  }

  // * 유효성 검사
  const regexHandler = ({ id, newValue }: regexType) => {
    if (id === 'id') {
      if (/^[a-z]{3,12}$/g.test(newValue)) {
        errorMsgHandler({ status: true, msg: '유효한 아이디입니다.' })
      } else {
        errorMsgHandler({ status: false, msg: '3~12자의 영어 소문자만 가능합니다.' })
      }
    } else if (id === 'pwd') {
      if (/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,12}$/g.test(newValue)) {
        errorMsgHandler({ status: true, msg: '유효한 비밀번호입니다.' })
      } else {
        errorMsgHandler({ status: false, msg: '8~12자의 영어 소문자 및 숫자만 가능합니다.' })
      }
    } else if (id === 'nickname') {
      if (/^[가-힣a-zA-Z0-9]{4,8}$/g.test(newValue)) {
        errorMsgHandler({ status: true, msg: '유효한 닉네임입니다.' })
      } else {
        errorMsgHandler({ status: false, msg: '4~8자의 한글, 영문, 숫자만 가능합니다.' })
      }
    }
  }

  return (
    <InputDiv>
      <div>
        <CommonLabel htmlFor={id}>{$label}</CommonLabel>
        <MessageP $status={errorMsg.status}>{errorMsg.msg}</MessageP>
      </div>
      <CommonInput
        type={type}
        id={id}
        name={id}
        // ? AuthState가 아니라 AuthStateType으로 체크해야 하는 이유 정리하기
        value={iptValue[id as keyof AuthStateType] || ''}
        onChange={(e) => onIptChangeHandler({ e, id })}
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
  }
`

const MessageP = styled.p<{ $status: boolean }>`
  padding-top: 5px;
  font-size: 10px;
  color: ${({ $status }) => ($status ? 'green' : 'red')};
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
