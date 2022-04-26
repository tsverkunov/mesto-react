import React from 'react'

function PopupWithForm({title, name, children, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup-${name}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" id="popup__close-button-profile"
                aria-label="Закрыть" onClick={onClose}/>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" id="popup__form-profile" name={name} noValidate>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm