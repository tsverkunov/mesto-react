import React, {useContext} from 'react'
import buttonPlus from '../images/plus_icon.svg'
import Card from './Card'
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useEffect, useState} from "react";
import {api} from "../utils/api";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const currentUser = useContext(CurrentUserContext)
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => setCards( state => (
        [...state.filter( c => c._id !== card._id )]
      )
      ))
  }

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
            <Card card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
            />
          )
        )}
      </section>
    </main>)
}

export default Main