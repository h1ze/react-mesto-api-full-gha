import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRouteElement from "./ProtectedRoute.js";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoHasError, setIsInfoHasError] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

    React.useEffect(
      () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          auth.getUserData(jwt)
            .then((responseUserData) => {
              setUserData(responseUserData.data);
              setLoggedIn(true);
              navigate('/', {replace: true});
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        }
      }, [navigate]);

    React.useEffect(
        () => { 
            Promise.all([api.getInitialCards(), api.getProfileData()])
                .then(([initialCards, profileData]) => {
                    setCards(initialCards);
                    setCurrentUser(profileData);
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        }, [])


  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (selectedCard) => setSelectedCard(selectedCard);

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
          setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  };

  function handleUpdateUser(profileData) {
    api.setProfileData(profileData)
      .then((responseProfileData)=> {
        setCurrentUser(responseProfileData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(avatarLink) {
    api.setAvatar(avatarLink)
      .then((responseProfileData)=> {
        setCurrentUser(responseProfileData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(newCardData) {
    api.setNewCard(newCardData)
      .then((responseNewCardData)=> {
        setCards([responseNewCardData, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  
  function handleLoginSubmit(loginData) {
    auth.sendAuthorization(loginData)
      .then((responseToken)=> {
        // Здесь нужно установить токен в localStorage
        localStorage.setItem("jwt", responseToken.token);
        // Здесь нужно переадресовать пользователя на страницу контента
        navigate('/', {replace:true})
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsInfoHasError(true);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegisterSubmit(registerData) {
    auth.sendRegister(registerData)
      .then((responseUserData)=> {
        // Здесь мы получаем данные зарегистрированного пользователя
        setUserData(responseUserData.data);
        setIsInfoTooltipOpen(true);
        navigate('/sign-in', {replace:true})
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsInfoHasError(true);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    userData.email = "";
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper wrapper">
          <Header email={userData.email} onSignOut={handleSignOut}/>
          <Routes>
            <Route path="/" 
              element={<ProtectedRouteElement
                element={Main}
                isloggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />} 
            />
            <Route path="/sign-in" element={<Login onLogin={handleLoginSubmit}/>} />
            <Route path="/sign-up" element={<Register onRegister={handleRegisterSubmit}/>} />
          </Routes>
          {loggedIn && <Footer />}
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            onClose={closeAllPopups}
            selectedCard={selectedCard} 
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isError={isInfoHasError}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
