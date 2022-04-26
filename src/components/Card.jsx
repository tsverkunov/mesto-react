import React from 'react'

function Card({card, onCardClick}) {

  const handleClick = () => {
    onCardClick(card)
  }

  return (
    <article className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      <button type="button" className="card__delete-button" aria-label="Удалить"/>
      <div className="card__title-wrap">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-wrap">
          <button type="button" className="card__heart" aria-label="Нравится"/>
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card