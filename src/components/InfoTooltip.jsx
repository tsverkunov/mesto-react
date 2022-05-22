import React from 'react'
import successImg from '../images/success.svg'
import errorImg from '../images/error.svg'

function InfoTooltip({isOpen, onClose, isSuccess, errorMessage}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popup-info-tooltip">
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          id="popup__close-button-image"
          aria-label="Закрыть"
        />
        <div className="popup__success-wrap">
          <img src={isSuccess ? successImg : errorImg} alt="Успешно" className='popup__success-image'/>
          <span className="popup__success-message">
            {isSuccess ? 'Вы успешно зарегистрировались!' : errorMessage}
          </span>
        </div>


        {/*<figure className="popup__figure">*/}
        {/*  <img*/}
        {/*    className="popup__image"*/}
        {/*    src={card?.link}*/}
        {/*    alt={card?.name}*/}
        {/*    id="popup__image-image"*/}
        {/*  />*/}
        {/*  <figcaption className="popup__image-caption">*/}
        {/*    {card?.name}*/}
        {/*  </figcaption>*/}
        {/*</figure>*/}
      </div>
    </div>
  )
}

export default InfoTooltip