import { useState, useEffect, useContext } from 'react';

import { Like, CurrentUserContext } from './index';

export default function Card({ cardData, callbackSetState, setStateSelectedCard, onCardLike, onCardDelete }) {
  const [isOwn, setIsOwn] = useState(false);
  const { name, link, owner } = cardData;

  const currentUser = useContext(CurrentUserContext);
  const handleClickSelectedCard = (e, link, name) => {
    if (e.target?.className?.includes('element__image')) {
      const data = {
        link: link,
        name: name,
        isOpened: true,
      };
      callbackSetState(setStateSelectedCard, data);
    }
  };

  const handleDeleteClick = (card) => {
    onCardDelete(card);
  };

  useEffect(() => {
    owner === currentUser._id ? setIsOwn(true) : setIsOwn(false);
  }, [currentUser._id, isOwn, owner]);

  return (
    <div onClick={(e) => handleClickSelectedCard(e, link, name)}>
      <div className='element'>
        {isOwn && (
          <button
            onClick={() => handleDeleteClick(cardData)}
            type='button'
            aria-label='Кнопка удалить карточку'
            className='element__trash'></button>
        )}
        <img
          className='element__image'
          alt={name}
          src={link}
        />
        <div className='element__case'>
          <h2 className='element__title'>{name}</h2>
          <Like
            currentUserId={currentUser._id}
            currentCardId={cardData._id}
            cardData={cardData}
            onCardLike={(card) => onCardLike(card)}
          />
        </div>
      </div>
    </div>
  );
}
