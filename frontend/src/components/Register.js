import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import { register } from "../Api/Auth";
import PopupAuth from "./PopupAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isOpenedPopup, setIsOpenedPopup] = React.useState(false);
  const [popupInfoText, setPopupInfoText] = React.useState(false);
  const [isResponseGood, setIsResponseGood] = React.useState(false);
  const navigate = useNavigate();

  const handleButtonClick = async (password, email) => {
    try {
      const response = await register(password, email);
      if (response.status === 201) {
        setPopupInfoText("Вы успешно зарегистрировались!");
        setIsOpenedPopup(true);
        setIsResponseGood(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        setPopupInfoText(response.data.error);
        setIsOpenedPopup(true);
        setIsResponseGood(false);
      }
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
        <h1 className="signUp__header">Регистрация</h1>
        <AuthForm btnText={"Зарегистрироваться"} onSubmit={handleButtonClick}></AuthForm>
        <p className="auth__prompt">
          Уже зарегистрированы?
          <Link to="/sign-in">
            <button className="auth__prompt_btn">Войти</button>
          </Link>
        </p>
      </div>
    </>
  );
}

//vasiliysome@yandex.ru
//somepassword
