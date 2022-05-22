import React, {useState} from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({isOpen, onClose, onAddPlace, preloader}) {
  const [formValues, setFormValues] = useState({name: '', link: ''})
  const [formErrors, setFormErrors] = useState({name: '', link: ''})

  const handleChange = (e) => {
    const {name, value, validationMessage} = e.target
    setFormValues({...formValues, [name]: value})
    setFormErrors({...formErrors, [name]: validationMessage})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace(formValues)
    setFormValues({name: '', link: ''})
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-cards"
      textButton="Создать"
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
            placeholder="Название"
            className="popup__field popup__field_type_name"
            id="popup__field_type_name-add-cards"
            minLength="2"
            maxLength="30"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <span
            className="popup__error"
            id="error-popup__field_type_name-add-cards"
          >
          {formErrors.name}
          </span>
        </div>
        <div className="popup__field-container">
          <input
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__field popup__field_type_link"
            id="popup__field_type_link-add-cards"
            value={formValues.link}
            onChange={handleChange}
            required
          />
          <span
            className="popup__error"
            id="error-popup__field_type_link-add-cards"
          >
          {formErrors.link}
          </span>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
