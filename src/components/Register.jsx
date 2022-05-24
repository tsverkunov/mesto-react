import React from 'react'
import {Link} from 'react-router-dom'
import Login from './Login'

function Register({onRegister}) {

  return (
    <Login
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSendData={onRegister}
    >
      <span className="popup__registered-sign-in">
        Уже зарегистрированы?
        <Link to="/sign-in" className="popup__sign-in-link"> Войти</Link>
      </span>
    </Login>
  )
}

export default Register