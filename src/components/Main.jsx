import React, {useContext} from 'react'
import Card from './Card'
import buttonPlus from '../images/plus_icon.svg'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({
                onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                cards,
                onCardLike,
                onCardDeletePopupOpen
              }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__avatar-info-group">
          <div className="profile__avatar" style={{backgroundImage: `url(${currentUser?.avatar})`}}>
            <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}/>
          </div>
          <div className="profile__info">
            <div className="profile__name-wrap">
              <h1 className="profile__name">
                {currentUser?.name}
              </h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Изменить"/>
            </div>
            <p className="profile__about">
              {currentUser?.about}
            </p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добавить">
          <img src={buttonPlus} className="profile__add-button-icon" alt="плюс"/>
        </button>
      </section>
      <section className="cards">
        {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeletePopupOpen={onCardDeletePopupOpen}
            />
          )
        )}
      </section>
    </main>)
}

export default Main