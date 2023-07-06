import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Write from './pages/Write';
import ProfileEdit from './pages/ProfileEdit';
import Navbar from './components/Navbar';
import Detail from './pages/Detail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Edit from './pages/Edit';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
