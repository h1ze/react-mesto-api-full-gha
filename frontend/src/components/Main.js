import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// import api from "../utils/api.js";
import Card from "./Card.js";


function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick,onCardLike, onCardDelete}) {
  
    const currentUser = React.useContext(CurrentUserContext); // Подписываемся на контекст CurrentUserContext

    return(
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img
                            className="profile__image"
                            src={currentUser.avatar} 
                            alt="Аватарка профиля"
                            />
                        <button 
                            className="profile__btn-image-edit"
                            onClick={onEditAvatar}
                            aria-label="Изменить аватарку"
                        ></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button
                                className="profile__btn-edit"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}
                            ></button>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                </div>
                <button
                    className="profile__btn-add"
                    type="button"
                    aria-label="Добавить карточку"
                    onClick={onAddPlace}
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
                </ul>
            </section>
        </main>
        )
};

export default Main;

