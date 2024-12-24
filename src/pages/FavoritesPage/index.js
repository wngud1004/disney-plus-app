import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user.id) return; // 사용자 인증 확인
      const favoritesRef = collection(db, 'favorites', user.id, 'movies'); // 하위 컬렉션 경로
      const snapshot = await getDocs(favoritesRef);
      const favoriteMovies = snapshot.docs.map((doc) => doc.data()); // Firestore에서 데이터 가져오기
      setFavorites(favoriteMovies);
    };

    fetchFavorites();
  }, [user.id]);

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">즐겨찾기</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="movie"
              onClick={() => navigate(`/${movie.id}`)} // 영화 상세 페이지로 이동
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title || '영화 이미지'}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title || '제목 없음'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-favorites">즐겨찾기한 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default FavoritesPage;