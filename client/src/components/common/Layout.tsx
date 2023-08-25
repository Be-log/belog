import { styled } from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <BackgroundDiv>
      <MaxWidthDiv>
        <Header />
        <Outlet />
      </MaxWidthDiv>
    </BackgroundDiv>
  )
}

export default Layout

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  min-height: 955px;
  background-color: ${({ theme }) => theme.black};
`

const MaxWidthDiv = styled.div`
  max-width: 1728px;
  margin: 0 auto;
`
