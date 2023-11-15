import React from 'react';

import { goodAuthImg, badAuthImg } from './index';

export default function PopupAuth({ isOpenedPopup, popupInfoText, setIsOpenedPopup, isResponseGood }) {
  const handleCloseButtonClick = () => {
    setIsOpenedPopup(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target?.className?.includes('auth__container')) {
      setIsOpenedPopup(false);
    }
  };
  return (
    <div
      className={`popup ${isOpenedPopup && 'popup_opened'}`}
      onMouseDown={handleOverlayClick}>
      <div className={`auth__container`}>
        <img
          src={isResponseGood ? goodAuthImg : badAuthImg}
          alt={isResponseGood ? 'Bad request' : 'Sucsess!'}
          className='auth__popup-img'
        />
        <p className='auth__popup-text'>{popupInfoText}</p>
        <button
          type='button'
          className='popup__exit popup__exit-profile'
          aria-label='Закрыть попап'
          onClick={handleCloseButtonClick}></button>
      </div>
    </div>
  );
}

//vasiliysome@yandex.ru
//somepassword
