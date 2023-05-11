import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import loginUser from '../modules/login'

const reducers = combineReducers({
  loginUser: loginUser,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginUser']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
})

export default store
