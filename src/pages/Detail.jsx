import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Image from '../components/Image'
import Navbar from './Navbar'

const Detail = () => {
  return (
    <>
      <Navbar />
      <WrapMain>
        <MainContentDiv>
          {/* 게시글 */}
          <div>
            {/* 글 정보 (제목, 작성일, 태그) */}
            <ContentTop>
              <ContentTitle>개발자가 ChatGPT 사용하는 법 등등 게시글 제목 작성</ContentTitle>
              <ContentWriter>
                <div>
                  <WriterSpan>username12</WriterSpan>
                  <span>·</span>
                  <span>2022년 05월 06일</span>
                </div>
                <EditDiv>
                  <EditSpan>수정</EditSpan>
                  <EditSpan>삭제</EditSpan>
                </EditDiv>
              </ContentWriter>
              <ContentTags>
                <Button color={'grey'} shape={'circle'}>ChatGPT</Button>
                <Button color={'grey'} shape={'circle'}>AI</Button>
              </ContentTags>
            </ContentTop>
            {/* 본문 */}
            <ContentMiddle>
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
              여기는 본문 내용이 들어갈 예정 <br />
            </ContentMiddle>
          </div>
          {/* 글 작성자 정보 */}
          <UserDiv>
            <Image
              src={`${process.env.PUBLIC_URL}/images/default_profile.png`}
              width={'100'}
              height={'100'}
            />
            <UserPDiv>
              <WriterNameP>username12</WriterNameP>
              <WriterDescP>TIL을 열심히 쓰려고 노력하고 있습니다</WriterDescP>
            </UserPDiv>
          </UserDiv>
          {/* 이전 포스트, 다음 포스트 */}
          <MovementDiv>
            <MovementLeft>
              <SetFontAwsomeLeft icon={faCircleLeft} />
              <MovementSpanDiv>
                <AnotherPost>이전 포스트</AnotherPost>
                <AnotherPostTitle>게시글 제목 어쩌고 저쩌고</AnotherPostTitle>
              </MovementSpanDiv>
            </MovementLeft>
            <MovementRight>
              <MovementSpanDiv>
                <AnotherPost>다음 포스트</AnotherPost>
                <AnotherPostTitle>게시글 제목 어쩌고 저쩌고</AnotherPostTitle>
              </MovementSpanDiv>
              <SetFontAwsomeRight icon={faCircleRight} />
            </MovementRight>
          </MovementDiv>
          {/* 댓글 */}
          <div>
            {/* 댓글 작성 */}
            <ReplyTotalP>N개의 댓글</ReplyTotalP>
            <form>
              <ReplyTextarea name="" placeholder="댓글을 작성하세요" cols="115" rows="5" />
              <FormButtonDiv>
                <Button color={'mint'}>댓글 작성</Button>
              </FormButtonDiv>
            </form>
            {/* 댓글 리스트 보기 */}
            <ReplyList>
              <div className="Reply">
                <ReplyInfo>
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/default_profile.png`}
                    width={'65'}
                    height={'65'}
                  />
                  <ReplyWriterInfo>
                    <div>
                      <ReplyNameP>usernickname</ReplyNameP>
                      <ReplyDescP>2023년 4월 28일</ReplyDescP>
                    </div>
                    <EditReplyDiv>
                      <EditReplySpan>수정</EditReplySpan>
                      <EditReplySpan>삭제</EditReplySpan>
                    </EditReplyDiv>
                  </ReplyWriterInfo>
                </ReplyInfo>
                <ReplyContent>
                  <p>도움이 되었어요!</p>
                </ReplyContent>
              </div>
            </ReplyList>
          </div>
        </MainContentDiv>
      </WrapMain>
    </>
  )
}

export default Detail

// * Wrap
const WrapMain = styled.main`
  background-color: #121212;
  color: white;
`

const MainContentDiv = styled.div`
  width: 1000px;
  margin: auto;
  padding-bottom: 50px;
`

// * Content
const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentMiddle = styled.div`
  margin: 30px 0;
  font-size: 18px;
  line-height: 1.7;
`

const ContentTitle = styled.h1`
  margin: 100px 0 30px 0;
  font-size: 40px;
  font-weight: bold;
`

const ContentWriter = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const WriterSpan = styled.span`
  font-weight: bold;
  border-right: 10px;
`

const EditDiv = styled.div`
  display: flex;
  gap: 15px;
`

const EditSpan = styled.span`
  cursor: pointer;
`

const ContentTags = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`

// * User
const UserDiv = styled.div`
  padding: 35px 40px;
  display: flex;
  border-bottom: 1px solid #797979;
`

const UserPDiv = styled.div`
  margin-left: 30px;
`

const WriterNameP = styled.p`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
`

const WriterDescP = styled.p`
  margin-top: 5px;
`

// * Movement
const MovementDiv = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SetFontAwsomeLeft = styled(FontAwesomeIcon)`
  width: 10%;
  font-size: 60px;
  color: #96F2D7;
  margin-right: 10px;
  margin-left: 10px;
  &:hover {
    transform: translateX(-10px);
  }
`

const SetFontAwsomeRight = styled(FontAwesomeIcon)`
  width: 10%;
  font-size: 60px;
  color: #96F2D7;
  margin-right: 10px;
  margin-left: 10px;
  &:hover {
    transform: translateX(10px);
  }
`

const MovementSpanDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const MovementLeft = styled.div`
  width: 390px;
  height: 80px;
  padding-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1E1E1E;
  border-radius: 3px;
  cursor: pointer;
`

const MovementRight = styled.div`
  width: 390px;
  height: 80px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #1E1E1E;
  border-radius: 3px;
  cursor: pointer;
`

const AnotherPost = styled.span`
  font-size: 13px;
  color: lightgrey;
`

const AnotherPostTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`

// * Reply
const ReplyList = styled.div`
  padding: 50px 0;
  border-bottom: 1px solid #797979;
`

const ReplyTotalP = styled.p`
  margin-left: 3px;
  font-size: 20px;
  font-weight: bold;
`

const FormButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ReplyTextarea = styled.textarea`
  margin: 20px 0;
  padding: 30px;
  resize: none;
  background-color: #1E1E1E;
  color: white;
  &:focus {
    outline: none;
  }
`
const ReplyInfo = styled.div`
  display: flex;
`

const ReplyWriterInfo = styled.div`
  width: 100%;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ReplyNameP = styled.p`
  margin-top: 3px;
  font-size: 20px;
  font-weight: bold;
`

const ReplyDescP = styled.p`
  margin-top: 3px;
  font-size: 14px;
  color: #797979;
`

const EditReplyDiv = styled.div`
  margin-top: 3px;
  display: flex;
  flex-direction: row;
  gap: 15px;
`

const EditReplySpan = styled.span`
  cursor: pointer;
`

 const ReplyContent = styled.div`
  margin-top: 30px;
  font-size: 18px;
`