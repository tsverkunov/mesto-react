import React from 'react'

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_img ${card ? 'popup_opened' : ''}`} id="popup-image">
      <div className="popup__container popup__container_img">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          id="popup__close-button-image"
          aria-label="Закрыть"
        />
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={card?.link}
            alt={card?.name}
            id="popup__image-image"
          />
          <figcaption className="popup__image-caption">
            {card?.name}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup