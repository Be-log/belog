import axios from 'axios'

// * 댓글 작성
const addReplys = async (replyInfo) => {
  const { postId, comment, accesstoken, refreshtoken } = replyInfo
  await axios.post(`http://3.34.52.229/api/posts/${postId}/comments`, {
    comment
  }, {
    headers: {
      accesstoken: `Bearer ${accesstoken}`,
      refreshtoken: `Bearer ${refreshtoken}`,
    }
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error.response)
  })
}

export { addReplys } 