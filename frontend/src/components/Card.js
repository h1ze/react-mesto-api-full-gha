import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext); 
    const isOwn = card.owner === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(userID => userID === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = ( 
        `element__button-like ${isLiked && 'element__button-like_active'}` 
    );

    const handleImageClick = () => {
       onCardClick(card);
    };  

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return(
        <li className="element">
            <img
                alt={card.name}
                className="element__image"
                src={card.link}
                onClick={handleImageClick}
            />
            {isOwn && <button 
                        className="element__button-delete" 
                        onClick={handleDeleteClick} 
                        type="button"
                        aria-label="Удалить"
                        />
            } 
            <div className="element__text">
                <h2 className="element__title">{card.name}</h2>
                    <div className="element__block-like">
                        <button
                            className={cardLikeButtonClassName}
                            type="button"
                            aria-label="Лайкнуть"
                            onClick={handleLikeClick}
                        ></button>
                        <span className="element__counter-like">{card.likes.length}</span>
                    </div>
            </div>
        </li>
    )
}

export default Card;