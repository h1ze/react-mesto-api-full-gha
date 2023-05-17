import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

const [cardTitle, setCardTitle] = React.useState("");
const [cardLink, setCardLink] = React.useState("");

// const [newCardData, setNewCardData] = React.useState({
//     name: "",
//     link: "",
// })

// const handleChange = (e) => {
//     // установите нужное состояние
//     // используйте e.target.name и e.target.value
//     console.log(e.target.name, e.target.value);
 
//     setNewCardData({
//         [e.target.name]: e.target.value,
//     });

//     console.log(newCardData.name, newCardData.link);

// };

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