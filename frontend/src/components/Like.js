import { useState, useEffect, useContext } from 'react';

import { LoaderContext, CurrentUserContext } from './index';

export default function Like({ cardData, onCardLike, currentCardId }) {
  const currentUser = useContext(CurrentUserContext);
  const pending = useContext(LoaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const { likes } = cardData;

  const isLiked = likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;
  const handleLikeClick = (card) => {
    onCardLike(card);
  };

  useEffect(() => {
    setIsLoading(pending.isLoading && pending.idCard === currentCardId);
  }, [pending, currentCardId]);

  return (
    <div
      id='element__like-section'
      className='element__like-section'>
      {!isLoading ? (
        <button
          onClick={() => handleLikeClick(cardData)}
          className={cardLikeButtonClassName}
          aria-label='Кнопка лайка'
          type='button'
        />
      ) : (
        <span className='loader'></span>
      )}
      <p className='element__likesCount'>{likes.length}</p>
    </div>
  );
}
