import { atom } from 'recoil'
import { AuthStateType, SignUpIptType } from '../interfaces/atomTypes'

export const authState = atom<AuthStateType>({
  key: 'authValue',
  default: {
    loginId: '',
    loginPwd: '',
    id: '',
    pwd: '',
    nickname: '',
  },
})

export const signUpIptState = atom<SignUpIptType>({
  key: 'iptErrorValue',
  default: {
    id: false,
    pwd: false,
    nickname: false,
  },
})
