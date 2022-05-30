import React from 'react'
import logo from '../images/logo.svg'
import {Link, useLocation} from 'react-router-dom'
import ButtonBurger from './ButtonBurger'

function Header({loggedIn, ownerEmail, onSignOut, onToggleMobileMenu}) {
  const location = useLocation()
  const handleClick = () => {
    onSignOut()
  }
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
      <div className="header__container">
        {
          loggedIn
            ? <>
              <ButtonBurger onToggleMobileMenu={onToggleMobileMenu}/>
              <div className="header__login-wrap">
                <span className="header__login">{ownerEmail}</span>
                <Link to="/sign-in" className="header__sign-in header__sign-in_out" onClick={handleClick}>Выйти</Link>
              </div>
            </>
            : (location.pathname === '/sign-up' && <Link to="/sign-in" className="header__sign-in">Войти</Link>)
            ||
            (location.pathname === '/sign-in' && <Link to="/sign-up" className="header__sign-in">Регистрация</Link>)
        }
      </div>
    </header>
  )
}

export default Header
