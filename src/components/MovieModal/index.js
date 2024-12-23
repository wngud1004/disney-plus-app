import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  id,
  setModalOpen
}) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const handleFavorite = () => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.some((fav) => fav.id === id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== id);
    } else {
      updatedFavorites.push({
        id,
        title: title || name,
        backdrop_path
      });
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className="modal-close"
          >
            X
          </span>

          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title || name}
          />

          <div className="modal__content">
            <p className="modal__details">
              {release_date || first_air_date} | 평점: {vote_average} / 10
            </p>

            <h2 className="modal__title">{title || name}</h2>
            <p className="modal__overview">{overview}</p>

            <button onClick={handleFavorite} className="modal__favorite-btn">
              {favorites.some((fav) => fav.id === id)
                ? '즐겨찾기 제거'
                : '즐겨찾기 추가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
