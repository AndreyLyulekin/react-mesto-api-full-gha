export const forms = {
  popup_card_delete: (
    <form name="profile-edit" className="popup__form" noValidate>
      <button type="submit" className="popup__btn">
        Да
      </button>
    </form>
  ),
  profile_edit: (
    <form name="profile-edit" className="popup__form" noValidate>
      <input
        name="avatar"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_type_name"
        type="url"
        pattern="^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?"
        required
      />
      <span id="errorMessage-avatar" className="popup__input-error"></span>
      <button type="submit" className="popup__btn popup__btn-inactive" disabled>
        Сохранить
      </button>
    </form>
  ),
  card_form: (
    <form name="card-form" className="popup__form" noValidate>
      <input
        name="cardName"
        type="text"
        placeholder="Введите название"
        className="popup__input popup__input_card_title"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="errorMessage-cardName" className="popup__input-error"></span>
      <input
        name="urlCard"
        placeholder="Вставьте ссылку на картину"
        className="popup__input popup__input_card_link"
        type="url"
        pattern="^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?"
        required
      />
      <span id="errorMessage-urlCard" className="popup__input-error"></span>
      <button type="submit" className="popup__btn popup__btn-inactive" disabled>
        Создать
      </button>
    </form>
  ),
};
