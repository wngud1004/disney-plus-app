import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';
import './DetailPage.css';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      // console.log('response',response);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId])
  
  const handleFavorite = () => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites.push(movie);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if(!movie) return null;

  return (
    <div className="detail-container">
      <img
        className="detail__poster"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title || movie.name}
      />
      <div className="detail__info">
        <h1 className="detail__title">{movie.title || movie.name}</h1>
        <p className="detail__tagline">{movie.tagline}</p>
        <p className="detail__overview">{movie.overview}</p>
        <p className="detail__details">
          개봉일: {movie.release_date} | 평점: {movie.vote_average} / 10
        </p>
        <button onClick={handleFavorite} className="detail__favorite-btn">
          {favorites.some((fav) => fav.id === movie.id)
            ? '즐겨찾기 제거'
            : '즐겨찾기 추가'}
        </button>
      </div>
    </div>
  );
};

export default DetailPage