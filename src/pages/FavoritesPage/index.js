import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const navigate = useNavigate();

  return (
    <section className="favorites-container">
      <h2>즐겨찾기</h2>
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
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>즐겨찾기한 영화가 없습니다.</p>
      )}
    </section>
  );
};

export default FavoritesPage;