import React from 'react';

import { CurrentUserContext, CardsContext, Card } from './index';

function Main(props) {
  const callbackSetState = props.setCallbacksState;
  const { setStatePopupProfile, setStatePopupAvatar, setStateCardState } = props.setters;

  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);
  return (
    <main>
      <section className='profile'>
        <div
          className='profile__avatar-case'
          onClick={() => callbackSetState(setStatePopupAvatar, true)}>
          <img
            src={currentUser.avatar}
            className='profile__photo'
            alt='Ваш аватар'
          />
          <div className='profile__avatar-change'></div>
        </div>
        <div className='profile__info-case'>
          <div className='profile__case'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              aria-label='Кнопка редактирования'
              className='profile__edit-btn'
              onClick={() => callbackSetState(setStatePopupProfile, true)}></button>
          </div>
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button
          type='button'
          aria-label='Кнопка добавления фото'
          className='profile__add-btn'
          onClick={() => callbackSetState(setStateCardState, true)}></button>
      </section>
      <section className='elements'>
        {cards.map((card) => (
          <Card
            onCardLike={(card) => props.onCardLike(card)}
            onCardDelete={(card) => props.onCardDelete(card)}
            key={card._id}
            cardData={card}
            callbackSetState={callbackSetState}
            setStateSelectedCard={props.setStateSelectedCard}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
