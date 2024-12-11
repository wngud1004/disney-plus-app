import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';

const Layout =() => {
  return(
    <div>
      <Nav />

      <Outlet />
    </div>
  )
}


function App() {
  return (
   <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="main" element={<MainPage />} />
        </Route>
      </Routes>
   </div>
  );
}

export default App;