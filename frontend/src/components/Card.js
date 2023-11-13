import React from "react";
import Like from "./Like";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ cardData, callbackSetState, setStateSelectedCard, onCardLike, onCardDelete }) {
  const { name, link, owner } = cardData;

  const currentUser = React.useContext(CurrentUserContext);
  const handleClickSelectedCard = (e, link, name) => {
    if (e.target?.className?.includes("element__image")) {
      const data = {
        link: link,
        name: name,
        isOpened: true,
      };
      callbackSetState(setStateSelectedCard, data);
    }
  };

  const isOwn = owner._id === currentUser._id;

  const handleDeleteClick = (card) => {
    onCardDelete(card);
  };

  return (
    <div onClick={(e) => handleClickSelectedCard(e, link, name)}>
      <div className="element">
        {isOwn && (
          <button
            onClick={() => handleDeleteClick(cardData)}
            type="button"
            aria-label="Кнопка удалить карточку"
            className="element__trash"></button>
        )}
        <img className="element__image" alt={name} src={link} />
        <div className="element__case">
          <h2 className="element__title">{name}</h2>
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
