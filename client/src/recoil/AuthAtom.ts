import { atom } from 'recoil'
import { AuthStateType } from '../interfaces/atomTypes'

export const AuthState = atom<AuthStateType>({
  key: 'auth',
  default: {
    loginId: '',
    loginPwd: '',
    id: '',
    pwd: '',
    nickname: '',
  },
})
