import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main, Post } from './pages'
import { Layout } from './components/common'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={''} element={<Main />} />
          <Route path={'post'} element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
