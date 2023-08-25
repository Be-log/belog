import { styled } from 'styled-components'
import { Image } from '../components/common'
import { profile } from '../assets'

const Detail = () => {
  return (
    <WrapPost>
      <PostInfoDiv>
        <h1>{'한글 Lorem Ipsum'}</h1>
        <span>{'olivia-kim'}</span>
        <span>{'·'}</span>
        <span>{'2023년 8월 17일'}</span>
      </PostInfoDiv>
      <PostDataDiv>
        {
          '재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.'
        }
      </PostDataDiv>
      <PostUserDiv>
        <Image $width={128} $height={128} $border={100} src={profile} />
        <div>
          <h2>{'닉네임'}</h2>
          <h3>{'소개글'}</h3>
        </div>
      </PostUserDiv>
    </WrapPost>
  )
}

export default Detail

const WrapPost = styled.main`
  width: 1000px;
  margin: auto;
  * {
    color: ${({ theme }) => theme.darkWhite};
  }
`

const PostInfoDiv = styled.section`
  padding-top: 30px;
  h1 {
    padding: 40px 0;
    font-size: 50px;
    font-weight: 600;
  }
  span {
    font-size: 18px;
  }
  span:nth-child(3) {
    margin: 0 5px;
  }
  span:nth-child(4) {
    color: ${({ theme }) => theme.gray};
  }
`

const PostDataDiv = styled.section`
  margin-top: 30px;
  padding: 30px 0 100px 0;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
  font-size: 18px;
`

const PostUserDiv = styled.section`
  padding: 30px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
  border-bottom: 1px solid ${({ theme }) => theme.deepGray};
  img {
    margin-right: 20px;
  }
  h2 {
    font-size: 30px;
    font-weight: 600;
  }
  h3 {
    margin-top: 5px;
    font-size: 18px;
  }
`
