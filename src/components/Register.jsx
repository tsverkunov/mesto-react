import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Register() {
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const [formErrors, setFormErrors] = useState({email: '', password: ''})
  const [isButtonDisabled , setIsButtonDisabled] = useState(true)


  const handleChange = (e) => {
    const {name, value, validationMessage} = e.target
    setFormValues({...formValues, [name]: value})
    // setFormErrors({...formErrors, [name]: validationMessage})
  }

  return (
    <div className="popup__container popup__container_sign-in">
      <h2 className="popup__title">Регистрация</h2>
      <form
        // onSubmit={onSubmit}
        className="popup__form"
        id="popup__form-profile"
        name="register"
        noValidate
      >
        <div className="popup__field-group popup__field-group_sign-in">
          <div className="popup__field-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="popup__field popup__field_type_name popup__field_sign-in"
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
              type="password"
              name="password"
              placeholder="Пароль"
              className="popup__field popup__field_type_link popup__field_sign-in"
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
        <button
          type="submit"
          className="popup__button-submit popup__button-submit_sign-in"
          // id={`popup__button-submit-${name}`}
          // disabled={isButtonDisabled}
        >
          Зарегистрироваться
          {/*{preloader ? 'Сохранение...' : textButton}*/}
        </button>
        <span className="popup__registered-sign-in">
          Уже зарегистрированы?
          <Link to='/sign-in' className="popup__sign-in-link"> Войти</Link>
        </span>
      </form>
    </div>
  )
}

export default Register