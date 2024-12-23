import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css'; // CSS 파일 추가

const FavoritesPage = () => {
  const [favorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const navigate = useNavigate();

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">즐겨찾기</h2>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="movie"
              onClick={() => navigate(`/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title}</p>
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