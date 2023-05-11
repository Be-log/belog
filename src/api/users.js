import axios from 'axios'

// * 회원가입 ID 중복체크
const idDoubleChk = async (newNickname) => {
  try {
    const response = await axios.get(`http://3.34.52.229/api/auth/checkNickname`, newNickname)
    return response.data
  } catch (error) {
    console.error('axios idDoubleChk Error', error)
  }
}

// * 회원가입
const addUsers = async (newUser) => {
  try {
    const response = await axios.post(`http://3.34.52.229/api/auth/signup`, newUser)
    return response.data
  } catch (error) {
    console.error('axios addUsers Error', error)
  }
}

// * 로그인
const loginUsers = async (loginUser) => {
  try {
    let setResponse = {
      getAccesstoken: '',
      getRefreshtoken: '',
    }

    await axios.post(`http://3.34.52.229/api/auth/login`, loginUser)
    .then(response => {
      setResponse.getAccesstoken = response.data.accesstoken
      setResponse.getRefreshtoken = response.data.refreshtoken
    })
    .catch(error => {
      console.error(error.response)
    })

    if (!!setResponse.getAccesstoken) {
      const loginToken = {
        headers: {
          accesstoken: `Bearer ${setResponse.getAccesstoken}`,
          refreshtoken: `Bearer ${setResponse.getRefreshtoken}`,
        }
      }
      await axios.get(`http://3.34.52.229/api/auth/profile`, loginToken)
      .then(response => {
        response.data.userInfo = {...response.data.userInfo, nickname: loginUser.nickname}
        setResponse = {...setResponse, ...response.data}
      })
      .catch(error => {
        console.error(error.response)
      })
    } else if (setResponse.getAccesstoken === '' || setResponse.getAccesstoken === null) {
      alert('로그인 중 오류가 발생했습니다.')
      return
    }

    return setResponse
  } catch (error) {
    console.error('axios loginUsers Error', error)
  }
}

export { idDoubleChk, addUsers, loginUsers } 