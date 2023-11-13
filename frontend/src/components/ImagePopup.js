function ImagePopup(props) {
  const { link, name, isOpened } = props.props;
  const callbackSetState = props.setStateSelectedCard;
  const handleOverlayClick = (e) => {
    if (e.target?.className?.includes("popup_scale-image")) {
      callbackSetState({
        link: link,
        name: name,
        isOpened: false,
      });
    }
  };

  const handleCloseButtonClick = () => {
    callbackSetState({
      link: link,
      name: name,
      isOpened: false,
    });
  };
  return (
    <div className={`popup popup_scale-image ${isOpened && "popup_opened"}`} onClick={handleOverlayClick}>
      <div className="popup__content-image">
        <img src={link} alt={name} className="popup__image" />
        <figcaption className="popup__subtitle">{name}</figcaption>
        <button
          type="button"
          className="popup__exit popup__exit-img"
          aria-label="Закрыть попап"
          onClick={handleCloseButtonClick}></button>
      </div>
    </div>
  );
}
export default ImagePopup;
//${isOpened && "popup_opened"}
