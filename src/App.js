import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';

// Layout 컴포넌트
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet /> {/* 중첩 라우트의 내용이 여기에 렌더링됩니다 */}
    </div>
  );
};

// App 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* 기본 라우트 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 중첩 라우트 */}
            <Route path="main" element={<MainPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":movieId" element={<DetailPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
