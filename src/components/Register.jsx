import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Register({onRegister}) {
  const [formValues, setFormValues] = useState({email: '', password: ''})

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(formValues)
  }

  return (
    <div className="popup__container popup__container_sign-in">
      <h2 className="popup__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className="popup__form"
        id="popup__form-sign-up"
        name="register"
        noValidate
      >
        <div className="popup__field-group popup__field-group_sign-in">
          <div className="popup__field-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="popup__field popup__field_type_email popup__field_sign-in"
              id="popup__field_type_email-sign-up"
              minLength="2"
              maxLength="30"
              value={formValues.email}
              onChange={handleChange}
              required
            />
            <span
              className="popup__error"
              id="error-popup__field_type_name-add-cards"
            >
          </span>
          </div>
          <div className="popup__field-container">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className="popup__field popup__field_type_password popup__field_sign-in"
              id="popup__field_type_password-sign-up"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <span
              className="popup__error"
              id="error-popup__field_type_link-add-cards"
            >
          </span>
          </div>
        </div>
        <button
          type="submit"
          className="popup__button-submit popup__button-submit_sign-in"
        >
          Зарегистрироваться
        </button>
        <span className="popup__registered-sign-in">
          Уже зарегистрированы?
          <Link to="/sign-in" className="popup__sign-in-link"> Войти</Link>
        </span>
      </form>
    </div>
  )
}

export default Register