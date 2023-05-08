import axios from 'axios'

// * 회원가입
const addUsers = async (newUser) => {
  try {
    const response = await axios.post(`http://localhost:4000/users`, newUser)
    return response.data
  } catch (error) {
    console.error('addUsers Error', error)
  }
}

export { addUsers }