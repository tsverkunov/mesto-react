import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleNameValue = (e) => {
    setName(e.target.value)
  }
  const handleDescriptionValue = (e) => {
    setDescription(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Редактировать профиль'
                   name='profile'
                   textButton='Сохранить'
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
    >
      <div className="popup__field-group">
        <div className="popup__field-container">
          <input type="text" name="name" className="popup__field popup__field_type_name"
                 id="popup__field_type_name-profile" value={name} onChange={handleNameValue} placeholder="" required minLength="2"
                 maxLength="40"/>
          <span className="popup__error" id="error-popup__field_type_name-profile"></span>
        </div>
        <div className="popup__field-container">
          <input type="text" name="about" className="popup__field popup__field_type_about"
                 id="popup__field_type_about-profile" value={description} onChange={handleDescriptionValue} placeholder="" required minLength="2"
                 maxLength="200"/>
          <span className="popup__error" id="error-popup__field_type_about-profile"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;