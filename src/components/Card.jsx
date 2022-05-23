import React, {useContext, useEffect, useRef} from 'react'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDeletePopupOpen}) {
  const imgRef = useRef()
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    imgRef.current.onerror = () => imgRef.current.src = 'https://more-show.ru/upload/not-available.png'
  },[])

  const handleClick = () => {
    onCardClick(card)
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDeletePopupOpen(card)
  }
  const isOwner = card.owner._id === currentUser._id
  const isLiked = card.likes.some(i => i._id === currentUser._id)

  const cardDeleteButtonClassName = `card__delete-button ${isOwner 
    ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`;
  const cardLikeButtonClassName = `card__heart ${isLiked ? 'card__heart_active' : ''}`

  return (
    <article className="card">
      <img ref={imgRef} src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"/>
      <div className="card__title-wrap">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-wrap">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится"/>
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card