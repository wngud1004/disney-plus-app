import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
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
  setModalOpen,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector((state) => state.user);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user.id) return;
      const favoritesRef = collection(db, 'favorites', user.id, 'movies'); // 하위 컬렉션 사용
      const snapshot = await getDocs(favoritesRef);
      const favoriteIds = snapshot.docs.map((doc) => doc.data().id);
      setIsFavorite(favoriteIds.includes(id));
    };

    fetchFavorites();
  }, [id, user.id]);

  const handleFavorite = async () => {
    if (!user.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    const favoritesRef = collection(db, 'favorites', user.id, 'movies'); // 하위 컬렉션 사용
    if (isFavorite) {
      const snapshot = await getDocs(favoritesRef);
      const favoriteDoc = snapshot.docs.find((doc) => doc.data().id === id);
      if (favoriteDoc) {
        await deleteDoc(doc(db, 'favorites', user.id, 'movies', favoriteDoc.id));
      }
    } else {
      await addDoc(favoritesRef, {
        id,
        title: title || name,
        backdrop_path,
      });
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
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
              {isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;