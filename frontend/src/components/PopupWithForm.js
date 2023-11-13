function PopupWithForm({
  title,
  divClassName,
  containerClassName,
  callbackSetState,
  isOpen,
  children,
  textButton,
  onSubmit,
}) {
  const handleOverlayClick = (e) => {
    if (e.target?.className?.includes(divClassName)) {
      callbackSetState(false);
    }
  };

  const handleCloseButtonClick = () => {
    callbackSetState(false);
  };
  return (
    <div className={`popup ${divClassName} ${isOpen && "popup_opened"}`} onMouseDown={handleOverlayClick}>
      <div className={`popup__container ${containerClassName}`}>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={(e) => onSubmit(e)}>
          {children}
          <button type="submit" className="popup__btn">
            {textButton}
          </button>
        </form>
        <button
          type="button"
          className="popup__exit popup__exit-profile"
          aria-label="Закрыть попап"
          onClick={handleCloseButtonClick}></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
