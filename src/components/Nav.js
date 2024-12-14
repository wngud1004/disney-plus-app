import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../firebase'
const Nav = () => {

  const initialUserData = localStorage.getItem('userData') ? 
  JSON.parse(localStorage.getItem('userData')) : {};
  
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
        navigate('/main'); // 로그인 후 main 페이지로 이동
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem('userData'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 삭제
        navigate(`/`); // 로그아웃 후 로그인 페이지로 이동
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/" ? (<Login onClick={handleAuth}>LOGIN</Login>) : 
        <Input
          value={searchValue}
          onChange={handleChange}
          className='nav__input' 
          type='text' 
          placeholder='검색해주세요'/>}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
