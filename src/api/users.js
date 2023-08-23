import api from './interceptor';

// * 회원가입 ID 중복체크
export const idDoubleChk = async (newNickname) => {
  return api
    .post(`/api/auth/checkNickname`, newNickname)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 회원가입
export const addUsers = (newUser) => {
  return api
    .post(`/api/auth/signup`, newUser)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 로그인
export const loginUsers = async (loginUser) => {
  try {
    let setResponse = {
      getAccesstoken: '',
      getRefreshtoken: '',
    };

    api
      .post(`/api/auth/login`, loginUser)
      .then((response) => {
        setResponse.getAccesstoken = response.data.accesstoken;
        setResponse.getRefreshtoken = response.data.refreshtoken;
      })
      .catch((error) => {
        throw error;
      });

    if (setResponse.getAccesstoken) {
      const loginToken = {
        headers: {
          accesstoken: `Bearer ${setResponse.getAccesstoken}`,
          refreshtoken: `Bearer ${setResponse.getRefreshtoken}`,
        },
      };

      api
        .get(`/api/auth/profile`, loginToken)
        .then((response) => {
          response.data.userInfo = {
            ...response.data.userInfo,
            nickname: loginUser.nickname,
          };
          setResponse = { ...setResponse, ...response.data };
        })
        .catch((error) => {
          throw error;
        });
    } else if (setResponse.getAccesstoken === '' || setResponse.getAccesstoken === null) {
      alert('로그인 중 오류가 발생했습니다.');
      return null;
    }

    return setResponse;
  } catch (error) {
    console.error('axios loginUsers Error', error);
    throw error;
  }
};
