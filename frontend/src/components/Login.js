import React from "react";
import AuthForm from "./AuthForm";
import { authorize } from "../Api/Auth";
import PopupAuth from "./PopupAuth";

export default function Login({ setToken, setIsLoggedIn }) {
  const [isOpenedPopup, setIsOpenedPopup] = React.useState(false);
  const [popupInfoText, setPopupInfoText] = React.useState(false);
  const [isResponseGood, setIsResponseGood] = React.useState(false);

  const handleButtonClick = async (password, email) => {
    try {
      const handleAuth = async (password, email) => {
        const response = await authorize(password, email);
        if (response.status === 200) {
          setIsOpenedPopup(true);
          setToken(response.data.token);
          setIsLoggedIn(true);
          setPopupInfoText("Логин успешен!");
          setIsResponseGood(true);
        } else {
          setIsOpenedPopup(true);
          setPopupInfoText("Что-то пошло не так! Попробуйте ещё раз.");
          setIsResponseGood(false);
        }
      };
      await handleAuth(password, email);
    } catch (error) {
      console.error(error?.response?.data?.error || error?.message);
    }
  };
  return (
    <>
      <PopupAuth
        isOpenedPopup={isOpenedPopup}
        setIsOpenedPopup={setIsOpenedPopup}
        popupInfoText={popupInfoText}
        isResponseGood={isResponseGood}
      />
      <div className="signUp__container">
        <h1 className="signUp__header">Вход</h1>
        <AuthForm btnText={"Войти"} onSubmit={handleButtonClick}></AuthForm>
      </div>
    </>
  );
}

//vasiliysome@yandex.ru
//somepassword
