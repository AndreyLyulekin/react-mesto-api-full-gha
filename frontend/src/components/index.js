import LoaderContext from '../contexts/LoaderContext';
import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';
import PopupWithForm from './PopupWithForm';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { userService } from '../Api/UserService';
import { cardService } from '../Api/CardsService';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoutes';
import { checkTokenValidity } from '../Api/Auth';
import Like from './Like';
import logo from '../images/logo.svg';
import AuthForm from './AuthForm';
import { authorize } from '../Api/Auth';
import PopupAuth from './PopupAuth';
import Card from './Card';
import goodAuthImg from '../images/Union.png';
import badAuthImg from '../images/Union (1).png';
import { register } from '../Api/Auth';

export {
  LoaderContext,
  CurrentUserContext,
  CardsContext,
  PopupWithForm,
  Header,
  Main,
  Footer,
  ImagePopup,
  userService,
  cardService,
  EditProfilePopup,
  EditAvatarPopup,
  AddPlacePopup,
  Login,
  Register,
  ProtectedRouteElement,
  checkTokenValidity,
  Like,
  logo,
  AuthForm,
  authorize,
  PopupAuth,
  Card,
  goodAuthImg,
  badAuthImg,
  register,
};
