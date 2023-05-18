function PopupWithForm({name, title, children, onClose, isOpen, onSubmit}) {
    return(
        <div className={`${isOpen ? "popup_opened" : ""} popup popup_menu_${name}`}
            onMouseDown={((evt) => {
                (evt.target === evt.currentTarget)  && onClose();
            })}
        >
            <div className="popup__container">
                <button 
                    className="popup__close" 
                    type="button"
                    onClick={onClose}
                ></button>
                <div className="popup__content">
                    <h2 className="popup__title">{title}</h2>
                    <form className="popup__form form" name={`${name}-form`} onSubmit={onSubmit}>
                        {children}
                        <button
                            className={`form__button ${name}-submit`}
                            type="submit"
                        >Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;