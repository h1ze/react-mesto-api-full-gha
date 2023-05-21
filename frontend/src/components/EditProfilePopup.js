import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [profileName, setProfileName] = React.useState('');
    const [profileDescription, setProfileDescription] = React.useState('');

    const handleProfileNameInputChange = (e) => {
        setProfileName(e.target.value);
    };

    const handleProfileDescriptionInputChange = (e) => {
        setProfileDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name: profileName,
          about: profileDescription,
        });
      } 

    React.useEffect(() => {
        setProfileName(currentUser.name);
        setProfileDescription(currentUser.about);
      }, [currentUser, isOpen]); 


    return (
        <PopupWithForm
            name = "profile"
            title = "Редактировать профиль"
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
        >
            <input
                id = "profile-name"
                className="form__input form__input_value_name"
                type="text"
                value={profileName || ""}
                name="name"
                tabIndex="1"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                onChange={handleProfileNameInputChange}
            />
            <span className="profile-name-error form__error"></span>
            <input
                id = "profile-info"
                className="form__input form__input_value_info"
                type="text"
                value={profileDescription || ""}
                name="about"
                tabIndex="2"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                onChange={handleProfileDescriptionInputChange}
            />
            <span className="profile-info-error form__error"></span>
        </PopupWithForm>  
    )
}

export default EditProfilePopup;