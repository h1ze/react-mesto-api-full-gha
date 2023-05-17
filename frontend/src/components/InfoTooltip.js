import imgAuthOk from '../images/auth-ok.svg';
import imgAuthFalse from '../images/auth-false.svg';

function InfoTooltip({onClose, isOpen, isError}) {
    return(
        <div className={`${isOpen ? "popup_opened" : ""} popup`}
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
            <div className="popup__auth-content">
                <img 
                    className="popup__icon"
                    src={isError ? imgAuthFalse : imgAuthOk}
                    alt="Статус регистрации"
                />
                <h2 className="popup__title">{isError ? " Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</h2>
            </div>
        </div>
    </div>
    )
}

export default InfoTooltip;