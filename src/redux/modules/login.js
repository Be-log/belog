import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const loginSlice = createSlice({
  // * 모듈의 이름
  name: 'loginUser',
  // * 모듈의 초기 상태 값
  initialState,
  // * 모듈의 Reducer 로직
  reducers: {
    setLoginUser: (state, action) => {
      return [...state, action.payload]
    }
  }
})

// * 컴포넌트에서 사용하기 위해 action creator를 export
export const { setLoginUser } = loginSlice.actions
// * configStore에 등록하기 위해 reducer를 export default
export default loginSlice.reducer