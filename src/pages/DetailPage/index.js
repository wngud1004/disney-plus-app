import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

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
    <section>
      <img 
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="img"
      />
      <button onClick={handleFavorite}>
        {favorites.some((fav) => fav.id === movie.id)
          ? '즐겨찾기 제거'
          : '즐겨찾기 추가'}
      </button>
    </section>
  )
}

export default DetailPage