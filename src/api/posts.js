import api from './interceptor';

// * 게시글 리스트 조회
export const getBoardList = () => {
  return api
    .get(`/api/posts/main`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 게시글 디테일 조회
export const getBoardDetail = (postId) => {
  return api
    .get(`/api/posts/${postId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 게시글 삭제
export const setBoardDelete = (postId) => {
  return api
    .patch(`/api/posts/${postId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 게시글 댓글 조회
export const getCommentList = (postId) => {
  return api
    .get(`/api/posts/${postId}/comments`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 댓글 작성
export const setComment = (commentInfo) => {
  const { postId, comment } = commentInfo;
  return api
    .post(`/api/posts/${postId}/comments`, comment)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 댓글 수정
export const setCommentEdit = async (commentInfo) => {
  const { postId, commentId, comment } = commentInfo;
  return api
    .post(`/api/posts/${postId}/comments/${commentId}`, comment)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 댓글 삭제
export const setCommentDelete = async (commentId) => {
  return api
    .patch(`/api/comments/${commentId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 이전글, 다음글 조회
export const getOtherBoard = async (otherBoardId) => {
  return api
    .get(`api/posts/${otherBoardId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
