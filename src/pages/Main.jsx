import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MainContainer, WrapContainer, Box, Boximg, BoxHeader, BoxNickname, BoxFooter } from '../components/styles';
import Header from '../components/Navbar';
import { getBoardList } from '../api/posts';

const Main = () => {
  const navigate = useNavigate();

  // * 메인페이지 조회
  const { data } = useQuery('getBoardList', () => getBoardList());

  // * 상세 게시글 조회
  const onPostClickHandler = (postId) => navigate(`/detail/${postId}`);

  return (
    <>
      <Header />
      <MainContainer>
        <WrapContainer>
          {data &&
            data.posts &&
            data.posts.map((box) => (
              <Box key={box.postId} onClick={() => onPostClickHandler(box.postId)}>
                <Boximg src={`${process.env.PUBLIC_URL}/images/test_thumbnail.png`} />
                <BoxHeader>{box.title}</BoxHeader>
                <BoxNickname>{`@${box.nickname}`}</BoxNickname>
                <BoxFooter>
                  {`${box.createdAt.slice(0, 4)}년 ${box.createdAt.slice(5, 7)}월 ${box.createdAt.slice(8, 10)}일
                  ${box.createdAt.slice(11, 13)}:${box.createdAt.slice(14, 16)}`}
                </BoxFooter>
              </Box>
            ))}
        </WrapContainer>
      </MainContainer>
    </>
  );
};

export default Main;
