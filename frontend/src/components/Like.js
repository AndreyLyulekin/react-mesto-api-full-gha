import React, { useEffect } from "react";
import LoaderContext from "../contexts/LoaderContext";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Like({ cardData, onCardLike, currentCardId }) {
  const currentUser = useContext(CurrentUserContext);
  const pending = useContext(LoaderContext);
  const { likes } = cardData;
  const [isLoading, setIsLoading] = React.useState(false);

  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_active"}`;
  const handleLikeClick = (card) => {
    onCardLike(card);
  };

  useEffect(() => {
    setIsLoading(pending.isLoading && pending.idCard === currentCardId);
  }, [pending, currentCardId]);

  return (
    <div id="element__like-section" className="element__like-section">
      {!isLoading ? (
        <button
          onClick={() => handleLikeClick(cardData)}
          className={cardLikeButtonClassName}
          aria-label="Кнопка лайка"
          type="button"
        />
      ) : (
        <span className="loader"></span>
      )}
      <p className="element__likesCount">{likes.length}</p>
    </div>
  );
}
