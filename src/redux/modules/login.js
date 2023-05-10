import { createSlice } from '@reduxjs/toolkit'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()


const initialState = {
  nickname: '',
  email: '',
  userImage: '',
  github: '',
  description: '',
}

const loginSlice = createSlice({
  // * 모듈의 이름
  name: 'loginUser',
  // * 모듈의 초기 상태 값
  initialState,
  // * 모듈의 Reducer 로직
  reducers: {
    setLoginUser: (state, action) => {
      return { ...state, ...action.payload }
    },
    setLogoutUser: (state, action) => {
      if (state.nickname === action.payload) {
        // * 브라우저 쿠키에 세팅된 토큰값 지우기
        cookies.remove('accesstoken', { path: '/' })
        cookies.remove('refreshtoken', { path: '/' })
        alert('로그아웃 되었습니다.')
        // * 로그인 시 세팅된 상태값 초기화
        return initialState
      }
    }
  }
})

// * 컴포넌트에서 사용하기 위해 action creator를 export
export const { setLoginUser, setLogoutUser } = loginSlice.actions
// * configStore에 등록하기 위해 reducer를 export default
export default loginSlice.reducer