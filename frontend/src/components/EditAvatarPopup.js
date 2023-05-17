import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarLinkField = React.useRef(null);
    let avatarLink;

    const handleProfileAvatar = () => {
         avatarLink = avatarLinkField.current.value;
    }
  

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarLink,
        });
    } 



    return(
        <PopupWithForm
            name = "avatar"
            title = "Обновить аватар"
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit= {handleSubmit}
        >
            <input
                id = "profile-avatar"
                className="form__input form__input_value_avatar"
                type="url"
                value={avatarLink}
                name="avatar"
                tabIndex="1"
                placeholder="Ссылка на картинку"
                required
                ref={avatarLinkField}
                onChange={handleProfileAvatar}
            />
            <span className="profile-avatar-error form__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;