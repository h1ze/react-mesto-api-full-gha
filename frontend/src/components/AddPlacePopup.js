import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

const [cardTitle, setCardTitle] = React.useState("");
const [cardLink, setCardLink] = React.useState("");


const handleCardTitleInputChange = (e) => {
    setCardTitle(e.target.value);
};


const handleCardLinkInputChange = (e) => {
    setCardLink(e.target.value);
};


const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
        name: cardTitle,
        link: cardLink,
    });
};

React.useEffect(() => {
    setCardTitle('');
    setCardLink('');
}, [isOpen]);


    return (
        <PopupWithForm
            name = "card"
            title = "Новое место"
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
        >
            <input
                id="card-title"
                className="form__input form__input_value_title"
                type="text"
                value={cardTitle}
                name="name"
                tabIndex="1"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                onChange={handleCardTitleInputChange}
            />
            <span className="card-title-error form__error"></span>
            <input
                id="card-url"
                className="form__input form__input_value_link"
                type="url"
                value={cardLink}
                name="link"
                tabIndex="2"
                placeholder="Ссылка на картинку"
                required
                onChange={handleCardLinkInputChange}
            />
            <span className="card-url-error form__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;