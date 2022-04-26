import React from 'react'
import buttonPlus from '../images/plus_icon.svg'
import Card from './Card'

function Main({onEditProfile, onAddPlace, onEditAvatar, userName, userDescription, userAvatar, cards, onCardClick}) {
  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__avatar-info-group">
          <div className="profile__avatar" style={{backgroundImage: `url(${userAvatar})`}}>
            <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__name-wrap">
              <h1 className="profile__name">
                {userName}
              </h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Изменить"/>
            </div>
            <p className="profile__about">
              {userDescription}
            </p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добавить">
          <img src={buttonPlus} className="profile__add-button-icon" alt="плюс"/>
        </button>
      </section>
      <section className="cards">
        {cards.map(card => {
          return (
            <Card card={card} key={card._id} onCardClick={onCardClick}/>
          )
        })}
      </section>
    </main>)
}

export default Main