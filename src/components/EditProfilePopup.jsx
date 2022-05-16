import React, {useContext, useEffect, useState} from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser, preloader}) {
  const currentUser = useContext(CurrentUserContext)
  const [formValues, setFormValues] = useState({name: '', about: ''})
  const [formErrors, setFormErrors] = useState({name: '', about: ''})

  useEffect(() => {
    setFormValues({name: currentUser.name || '', about: currentUser.about || ''})
  }, [currentUser, isOpen])

  const handleChange = (e) => {
    const {name, value, validationMessage} = e.target
    setFormValues(prevState => ({...prevState, [name]: value}))
    setFormErrors(prevState => ({...prevState, [name]: validationMessage}))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser(formValues)
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      preloader={preloader}
      formErrors={formErrors}
    >
      <div className="popup__field-group">
        <div className="popup__field-container">
          <input
            type="text"
            name="name"
            placeholder=""
            className="popup__field popup__field_type_name"
            id="popup__field_type_name-profile"
            minLength="2"
            maxLength="40"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <span
            className="popup__error"
            id="error-popup__field_type_name-profile"
          >
            {formErrors.name}
          </span>
        </div>
        <div className="popup__field-container">
          <input
            type="text"
            name="about"
            placeholder=""
            className="popup__field popup__field_type_about"
            id="popup__field_type_about-profile"
            minLength="2"
            maxLength="200"
            value={formValues.about}
            onChange={handleChange}
            required
          />
          <span
            className="popup__error"
            id="error-popup__field_type_about-profile"
          >
            {formErrors.about}
          </span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup