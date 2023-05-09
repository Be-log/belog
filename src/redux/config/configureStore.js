import { configureStore } from '@reduxjs/toolkit'
import loginUser from '../modules/login'


const store = configureStore({
  reducer: {
    loginUser
  },
})

export default store