import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';

// Layout 컴포넌트
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

// App 컴포넌트
function App() {
  return (
      <div className="app">
        <Routes>
          {/* 기본 라우트 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 중첩 라우트 */}
            <Route index element={<LoginPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
