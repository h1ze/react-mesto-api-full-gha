function ImagePopup({onClose, selectedCard}) {
    return(
        <div className={`${Object.keys(selectedCard).length !== 0 ? "popup_opened" : ""} popup popup_menu_image popup_background_darkest`}
             onClick={((evt) => {
              (evt.target === evt.currentTarget) && onClose();
             })}
        >
        <div className="popup__container">
          <button 
            className="popup__close btn-shut-image" 
            type="button"
            onClick={onClose}
          ></button>
          <div className="popup__holder-image">
            <figure className="popup__figure">
              <img className="popup__image" alt={selectedCard.name} src={selectedCard.link} />
              <figcaption className="popup__caption">{selectedCard.name}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    )
}

export default ImagePopup;