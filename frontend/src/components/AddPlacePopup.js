import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setNameNewCard] = useState("");
  const [link, setLinkNewCard] = useState("");

  const handleButtonClick = (e) => {
    onAddPlace(e, link, name);
  };
  return (
    <PopupWithForm
      title="Новое место"
      divClassName="popup_card"
      containerClassName="popup__container-card"
      isOpen={isOpen}
      callbackSetState={onClose}
      textButton="Создать"
      onSubmit={handleButtonClick}>
      <input
        name="cardName"
        type="text"
        placeholder="Введите название"
        className="popup__input popup__input_card_title"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={(e) => setNameNewCard(e.target.value)}
      />
      <span id="errorMessage-cardName" className="popup__input-error"></span>
      <input
        name="urlCard"
        placeholder="Вставьте ссылку на картину"
        className="popup__input popup__input_card_link"
        type="url"
        value={link || ""}
        onChange={(e) => setLinkNewCard(e.target.value)}
      />
      <span id="errorMessage-urlCard" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
// popup__btn-inactive
