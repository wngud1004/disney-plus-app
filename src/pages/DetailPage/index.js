import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import './DetailPage.css';

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);

      if (!user.id) return;
      const favoritesRef = collection(db, 'favorites', user.id, 'movies'); // 하위 컬렉션 사용
      const snapshot = await getDocs(favoritesRef);
      const favoriteIds = snapshot.docs.map((doc) => doc.data().id);
      setIsFavorite(favoriteIds.includes(response.data.id));
    };

    fetchData();
  }, [movieId, user.id]);

  const handleFavorite = async () => {
    if (!user.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    const favoritesRef = collection(db, 'favorites', user.id, 'movies'); // 하위 컬렉션 사용
    if (isFavorite) {
      const snapshot = await getDocs(favoritesRef);
      const favoriteDoc = snapshot.docs.find((doc) => doc.data().id === movie.id);
      if (favoriteDoc) {
        await deleteDoc(doc(db, 'favorites', user.id, 'movies', favoriteDoc.id));
      }
    } else {
      await addDoc(favoritesRef, {
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
      });
    }

    setIsFavorite(!isFavorite);
  };

  if (!movie) return null;

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
          {isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
        </button>
      </div>
    </div>
  );
};

export default DetailPage;