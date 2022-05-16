import React, {useRef, useState} from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, preloader}) {
  const inputRef = useRef()
  const [formErrors, setFormErrors] = useState({link: ''})

  const handleErrorMessage = (e) => {
    const {name, validationMessage} = e.target
    setFormErrors(prevState => ({...prevState, [name]: validationMessage}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: inputRef.current.value,
    })
    inputRef.current.value = ''
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      preloader={preloader}
      formErrors={formErrors}
    >
      <div className="popup__field-container popup__field-container_type_link-edit-avatar">
        <input
          ref={inputRef}
          type="url"
          name="link"
          className="popup__field popup__field_link-edit-avatar"
          id="popup__field_type_link-edit-avatar"
          placeholder="Ссылка на картинку"
          required
          onInput={handleErrorMessage}
        />
        <span
          className="popup__error"
          id="error-popup__field_type_link-edit-avatar"
        >
          {formErrors.link}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup