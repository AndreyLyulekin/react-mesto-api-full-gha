import '../index.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useNavigate } from 'react-router-dom';

import {
  Header,
  Main,
  ImagePopup,
  Footer,
  cardService,
  userService,
  CurrentUserContext,
  CardsContext,
  LoaderContext,
  EditProfilePopup,
  EditAvatarPopup,
  AddPlacePopup,
  Login,
  Register,
  ProtectedRouteElement,
  checkTokenValidity,
} from './index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInEmail, setLogInEmail] = useState('');
  const [popupProfileState, setStatePopupProfile] = useState(false);
  const [popupAvatarState, setStatePopupAvatar] = useState(false);
  const [selectedCardState, setStateCardState] = useState(false);
  const [popupSelectedCardState, setStateSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [apiCardsState, setApiCardsState] = useState([]);
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    idCard: '',
  });

  const navigate = useNavigate();

  const closeAllPopups = (currentPopup) => {
    currentPopup(false);
  };

  const setCallbacksState = (setter, data) => {
    setter(data);
  };

  const callbacksState = {
    setStatePopupProfile,
    setStatePopupAvatar,
    setStateCardState,
    setStateSelectedCard,
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      setIsLoading({ isLoading: true, idCard: card._id });
      cardService
        .setLikeInActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading({ isLoading: false, idCard: '' }));
    } else {
      setIsLoading({ isLoading: true, idCard: card._id });
      cardService
        .setLikeActive(card._id)
        .then((newCard) => {
          setApiCardsState((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading({ isLoading: false, idCard: '' }));
    }
  }
  function handleCardDelete(card) {
    cardService
      .deleteCard(card._id)
      .then((currentCard) => {
        if (currentCard.message !== 'Карточка удалена') return;

        setApiCardsState((state) => state.filter((cardToDelete) => card._id !== cardToDelete._id));
      })
      .catch(console.error);
  }

  function handleSubmitUserInfo(e, name, description) {
    e.preventDefault();
    userService
      .updateUserInfo({
        name,
        about: description,
      })
      .then(() => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: name,
          about: description,
        }));
        closeAllPopups(setStatePopupProfile);
      })
      .catch(console.error);
  }

  function handleSubmitUserAvatar(e, urlAvatarImg) {
    e.preventDefault();
    userService
      .changeAvatar({
        avatar: urlAvatarImg,
      })
      .then(() => {
        setCurrentUser((prevState) => ({
          ...prevState,
          avatar: urlAvatarImg,
        }));
        closeAllPopups(setStatePopupAvatar);
      })
      .catch(console.error);
  }
  function handleAddPlaceSubmit(e, newCardLink, newCardName) {
    e.preventDefault();
    cardService
      .addNewCard({
        link: newCardLink,
        name: newCardName,
      })
      .then((responseCard) => {
        setApiCardsState([responseCard, ...apiCardsState]);
        closeAllPopups(setStateCardState);
      })
      .catch(console.error);
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      Promise.all([userService.getCurrentUser(), cardService.getAllCards()])
        .then(([userInfoAnswer, cardsAnswer]) => {
          setCurrentUser({ ...userInfoAnswer });
          setApiCardsState([...cardsAnswer]);
          setLogInEmail(userInfoAnswer.email);
        })
        .catch((e) => console.error(e?.reason || e?.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    const handleAuth = async (token) => {
      try {
        const response = await checkTokenValidity(token);
        setLogInEmail(response.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error?.reason || error?.message);
      }
    };
    handleAuth(localStorage.getItem('token'));
  }, []);

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          onUpdateUser={(e, name, description) => handleSubmitUserInfo(e, name, description)}
          isOpen={popupProfileState}
          onClose={setStatePopupProfile}
        />
        <EditAvatarPopup
          onUpdateAvatar={(e, urlAvatarImg) => handleSubmitUserAvatar(e, urlAvatarImg)}
          isOpen={popupAvatarState}
          onClose={setStatePopupAvatar}
        />
        <AddPlacePopup
          onAddPlace={(e, newCardLink, newCardName) => handleAddPlaceSubmit(e, newCardLink, newCardName)}
          isOpen={selectedCardState}
          onClose={setStateCardState}
        />
        <ImagePopup
          props={popupSelectedCardState}
          setStateSelectedCard={setStateSelectedCard}
        />
        <Header
          logInEmail={logInEmail}
          isLoggedIn={isLoggedIn}
          setLogInEmail={setLogInEmail}
          setIsLoggedIn={setIsLoggedIn}
        />
        <LoaderContext.Provider value={isLoading}>
          <CardsContext.Provider value={apiCardsState}>
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRouteElement
                    element={() => (
                      <Main
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        setCallbacksState={setCallbacksState}
                        setters={callbacksState}
                        setStateSelectedCard={setStateSelectedCard}
                      />
                    )}
                    loggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path='/sign-up'
                element={<Register />}
              />
              <Route
                path='/sign-in'
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
            </Routes>
          </CardsContext.Provider>
        </LoaderContext.Provider>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
