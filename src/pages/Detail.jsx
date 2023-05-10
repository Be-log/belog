import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import React, { useState } from 'react'
import { addReplys } from '../api/posts'
import axios from 'axios'
import styled from 'styled-components'
import Button from '../components/Button'
import Image from '../components/Image'
import Navbar from './Navbar'

const Detail = () => {
  const [replyComment, setReplyComment] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const getLoginInfo = useSelector((state) => state.loginUser)
  const cookies = new Cookies()

  const { postComment, ...post } = location.state.post.post
  console.log(postComment)

  const deletePage = () => {

  }

  // * reply onChange
  const replyTxtAreaChange = (e) => {
    setReplyComment(e.target.value)
  }

  // * 댓글 등록 useMutation
  const addReplyMutation = useMutation(addReplys, {
    onSuccess: (response) => {
      console.log('성공뮤테이션~', response)
    }
  })

  // * 댓글 등록 버튼 click
  const addReplyClickHandelr = (e) => {
    e.preventDefault()
    if (!replyComment) {
      alert('댓글을 입력해주세요.')
      return
    } else {
      const replyInfo = {
        postId: location.pathname.slice(8),
        comment: replyComment,
        accesstoken: cookies.get('accesstoken'),
        refreshtoken: cookies.get('refreshtoken'),
      }
      addReplyMutation.mutate(replyInfo)
    }
  }

  const movementClickHandler = async (movementPostId) => {
    if (!movementPostId) {
      alert('작성된 글이 없습니다.')
    } else {
      await axios.get(`http://3.34.52.229/api/posts/${movementPostId}`)
      .then(response => {
        navigate(`/detail/${movementPostId}`, { state: { post: response.data } })
      })
      .catch(error => {
        console.error('axios pageMovementClick Error', error);
      })
    }
  }
  return (
    <>
      <Navbar />
      <WrapMain>
        <MainContentDiv>
          {/* 게시글 */}
          <div>
            {/* 글 정보 (제목, 작성일, 태그) */}
            <ContentTop>
              <ContentTitle>{post.title}</ContentTitle>
              <ContentWriter>
                <div>
                  <WriterSpan>{post.nickname}</WriterSpan>
                  <SpaceSpan>·</SpaceSpan>
                  <span>
                    {
                      `${post.createdAt.slice(0, 4)}년
                       ${post.createdAt.slice(5, 7)}월
                       ${post.createdAt.slice(8, 10)}일
                      `
                    }
                  </span>
                </div>
                <EditDiv>
                  {
                    getLoginInfo.nickname === post.nickname &&
                    <>
                      <EditSpan>수정</EditSpan>
                      <EditSpan onClick={deletePage}>삭제</EditSpan>
                    </>
                  }
                </EditDiv>
              </ContentWriter>
              <ContentTags>
                {/* TODO 글 작성 시 tag 추가하면 문자열 끊고 map으로 작업 */}
                <Button color={'grey'} shape={'circle'}>ChatGPT</Button>
                <Button color={'grey'} shape={'circle'}>AI</Button>
              </ContentTags>
            </ContentTop>
            {/* 본문 */}
            <ContentMiddle>
              {post.content}
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
              <WriterNameP>{post.nickname}</WriterNameP>
              <WriterDescP>들어오는 데이터 따로 없음</WriterDescP>
            </UserPDiv>
          </UserDiv>
          {/* 이전 포스트, 다음 포스트 */}
          <MovementDiv>
            <MovementLeft
              onClick={() => movementClickHandler(post.prevPostId)}
            >
              <SetFontAwsomeLeft icon={faCircleLeft} />
              <MovementSpanDiv>
                <AnotherPost>이전 포스트</AnotherPost>
                { post.prevPostId !== '' ?
                  <AnotherPostTitle>{post.prevPostTitle}</AnotherPostTitle>
                  : <PostTitleNone>이전 글이 없습니다.</PostTitleNone>
                }
              </MovementSpanDiv>
            </MovementLeft>
            <MovementRight
              onClick={() => movementClickHandler(post.nextPostId)}
            >
              <MovementSpanDiv>
                <AnotherPost>다음 포스트</AnotherPost>
                {
                  post.nextPostId !== '' ?
                  <AnotherPostTitle>{post.nextPostTitle}</AnotherPostTitle>
                  : <PostTitleNone>다음 글이 없습니다.</PostTitleNone>
                }
              </MovementSpanDiv>
              <SetFontAwsomeRight icon={faCircleRight} />
            </MovementRight>
          </MovementDiv>
          {/* 댓글 */}
          <div>
            {/* 댓글 작성 */}
            <ReplyTotalP>{postComment.length}개의 댓글</ReplyTotalP>
            <form>
              <ReplyTextarea
                name="comment"
                value={replyComment}
                onChange={replyTxtAreaChange}
                placeholder="댓글을 작성하세요"
                cols="115"
                rows="5"
              />
              <FormButtonDiv>
                <Button
                  color={'mint'}
                  onClick={addReplyClickHandelr}
                >
                  댓글 작성
                </Button>
              </FormButtonDiv>
            </form>
            {/* 댓글 리스트 보기 */}
            {
              postComment.map((reply) => {
                return (
                  <ReplyList key={reply.commentId}>
                    <div className="Reply">
                      <ReplyInfo>
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/default_profile.png`}
                          width={'65'}
                          height={'65'}
                        />
                        <ReplyWriterInfo>
                          <div>
                            <ReplyNameP>{reply.nickname}</ReplyNameP>
                            <ReplyDescP>
                            {
                              `${reply.createdAt.slice(0, 4)}년
                              ${reply.createdAt.slice(5, 7)}월
                              ${reply.createdAt.slice(8, 10)}일
                              `
                            }
                            </ReplyDescP>
                          </div>
                          <EditReplyDiv>
                          {
                            getLoginInfo.nickname === reply.nickname &&
                            <>
                              <EditReplySpan>수정</EditReplySpan>
                              <EditReplySpan>삭제</EditReplySpan>
                            </>
                          }
                          </EditReplyDiv>
                        </ReplyWriterInfo>
                      </ReplyInfo>
                      <ReplyContent>
                        <p>{reply.comment}</p>
                      </ReplyContent>
                    </div>
                  </ReplyList>
                )
              })
            }
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

const SpaceSpan = styled.span`
  margin: 0 10px;
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

const otherPostNone = styled.span`
  font-size: 13px;
  color: #797979;
`

const AnotherPostTitle = styled.span`
  font-size: 16px;
`

const PostTitleNone = styled.span`
  color: #797979
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