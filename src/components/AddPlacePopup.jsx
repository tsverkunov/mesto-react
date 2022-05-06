import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace({
      name,
      link
    })
  }
  const handleNameValue = (e) => {
    setName(e.target.value)
  }
  const handleLinkValue = (e) => {
    setLink(e.target.value)
  }
  return (
    <PopupWithForm title='Новое место'
                   name='add-cards'
                   textButton='Создать'
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
    >
      <div className="popup__field-group">
        <div className="popup__field-container">
          <input type="text" name="name" className="popup__field popup__field_type_name" required
                 minLength="2"
                 maxLength="30" id="popup__field_type_name-add-cards" value={name} onChange={handleNameValue} placeholder="Название"/>
          <span className="popup__error" id="error-popup__field_type_name-add-cards"></span>
        </div>
        <div className="popup__field-container">
          <input type="url" name="link" className="popup__field popup__field_type_link"
                 id="popup__field_type_link-add-cards" value={link} onChange={handleLinkValue} placeholder="Ссылка на картинку" required/>
          <span className="popup__error" id="error-popup__field_type_link-add-cards"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;