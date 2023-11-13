import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header({ logInEmail, isLoggedIn, setLogInEmail, setToken, setIsLoggedIn }) {
  const location = useLocation();
  const [textAuth, setTextAuth] = useState("Войти");
  const [linkRoute, setLinkRoute] = useState("/sign-up");

  const signOut = () => {
    setLogInEmail("");
    setToken("");
    setTextAuth("Регистрация");
    setLinkRoute("/sign-up");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTextAuth("Выйти");
      setLinkRoute("/sign-in");
    }
    if (!isLoggedIn) {
      switch (location.pathname) {
        case "/":
          setTextAuth("Войти");
          setLinkRoute("/sign-in");
          break;
        case "/sign-in":
          setTextAuth("Регистрация");
          setLinkRoute("/sign-up");
          break;
        default:
          setTextAuth("Войти");
          setLinkRoute("/sign-in");
          break;
      }
    }
  }, [location, isLoggedIn]);

  return (
    <header className="header">
      <Link to="/" className="signup__link">
        <img src={logo} className="header__logo" alt="Логотип" />
      </Link>
      <div className="header__userContainer">
        <p className="header__user-email">{logInEmail}</p>
        <Link to={linkRoute} className="signup__link">
          <button
            onClick={signOut}
            type="button"
            aria-label="Перейти на страницу авторизации"
            className="header__textAuth">
            {textAuth}
          </button>
        </Link>
      </div>
    </header>
  );
}
export default Header;
