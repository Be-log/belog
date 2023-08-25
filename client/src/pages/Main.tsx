import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Image } from '../components/common'
import { profile, thumbnail } from '../assets'

const Main = () => {
  const navigate = useNavigate()

  return (
    <WrapMain>
      <BoxDiv onClick={() => navigate('/post')}>
        <Image $height={150} $border={3} src={thumbnail} />
        <BoardDiv>
          <h1>{'한글 Lorem Ipsum'}</h1>
          <h2>
            {
              '재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.'
            }
          </h2>
          <span>{'2023년 8월 17일'}</span>
        </BoardDiv>
        <NicknameDiv>
          <Image $width={24} $height={24} $border={50} src={profile} />
          <span>{'by'}</span>
          <h3>{'olivia-kim'}</h3>
        </NicknameDiv>
      </BoxDiv>
    </WrapMain>
  )
}

export default Main

const WrapMain = styled.main`
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(5, 270px);
  gap: 60px;
  justify-content: center;
  align-items: center;
`

const BoxDiv = styled.div`
  width: 300px;
  height: 400px;
  align-items: center;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
  transition: transform 0.2s ease-out;
  h1,
  h2,
  p,
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.gray};
  }
  h1 {
    font-size: 17px;
  }
  h2 {
    height: 100px;
    margin-bottom: 10px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 400;
    white-space: pre-line;
    line-height: 1.5;
  }
  span,
  h3 {
    font-size: 13px;
  }
  & > div {
    padding: 15px;
  }
  &:hover {
    transform: translateY(-10px);
  }
`

const BoardDiv = styled.div`
  height: 190px;
`

const NicknameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
`
