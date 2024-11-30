import React from 'react';
import logo from '../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';
import ButtonBurger from './ButtonBurger';

function Header({ loggedIn, ownerEmail, onSignOut, onToggleMobileMenu }) {
  const location = useLocation();
  const handleClick = () => {
    onSignOut();
  };
  const renderAuthLinks = () => {
    if (loggedIn) {
      return (
        <div className="header__container">
          <ButtonBurger onToggleMobileMenu={onToggleMobileMenu}/>
          <div className="header__login-wrap">
            <span className="header__login">{ownerEmail}</span>
            <Link
              to="/sign-in"
              className="header__sign-in header__sign-in_out"
              onClick={handleClick}>
              Выйти
            </Link>
          </div>
        </div>
      );
    }
    if (location.pathname === '/sign-up') {
      return <Link to="/sign-in" className="header__sign-in">Войти</Link>;
    }
    if (location.pathname === '/sign-in') {
      return <Link to="/sign-up" className="header__sign-in">Регистрация</Link>;
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
      <div className="header__container">
        {renderAuthLinks()}
      </div>
    </header>
  );
}

export default Header;
