import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function MobileMenu({loggedIn, ownerEmail, isOpen, onSignOut}) {
  const location = useLocation()

  const handleClick = () => {
    onSignOut()
  }

  return (
    loggedIn && <div className={`mobile-menu ${isOpen ? 'mobile-menu_open' : ''}`}>
      <span className="header__login header__login_type_mobile">{ownerEmail}</span>
      {loggedIn
        ? <Link to="/sign-in" className="header__sign-in header__sign-in_out" onClick={handleClick}>Выйти</Link>
        : (location.pathname === '/sign-up' && <Link to="/sign-in" className="header__sign-in">Войти</Link>)
        ||
        (location.pathname === '/sign-in' && <Link to="/sign-up" className="header__sign-in">Регистрация</Link>)
      }
    </div>
  )
}

export default MobileMenu