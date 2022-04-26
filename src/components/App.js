import React, {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import {api} from '../utils/api'

function App() {
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  let [userName, setUserName] = useState('')
  let [userDescription, setUserDescription] = useState('')
  let [userAvatar, setUserAvatar] = useState('')
  let [cards, setCards] = useState([])
  let [selectedCard, setSelectedCard] = useState('')

  useEffect(() => {
    api.getProfile()
      .then(res => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
  }, [])

  useEffect( () => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
  }, [])


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard('')
  }
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          userName={userName}
          userDescription={userDescription}
          userAvatar={userAvatar}
          cards={cards}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm title={'Редактировать профиль'}
                       name={'profile'}
                       isOpen={isEditProfilePopupOpen}
                       onClose={closeAllPopups}>
          <div className="popup__field-group">
            <div className="popup__field-container">
              <input type="text" name="name" className="popup__field popup__field_type_name"
                     id="popup__field_type_name-profile" value="" placeholder="" required minLength="2"
                     maxLength="40"/>
              <span className="popup__error" id="error-popup__field_type_name-profile"></span>
            </div>
            <div className="popup__field-container">
              <input type="text" name="about" className="popup__field popup__field_type_about"
                     id="popup__field_type_about-profile" value="" placeholder="" required minLength="2"
                     maxLength="200"/>
              <span className="popup__error" id="error-popup__field_type_about-profile"></span>
            </div>
          </div>
          <button type="submit" className="popup__button-submit" id="popup__button-submit-profile">
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm title={'Новое место'}
                       name={'add-cards'}
                       isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}>
          <div className="popup__field-group">
            <div className="popup__field-container">
              <input type="text" name="name" className="popup__field popup__field_type_name" required
                     minLength="2"
                     maxLength="30" id="popup__field_type_name-add-cards" value="" placeholder="Название"/>
              <span className="popup__error" id="error-popup__field_type_name-add-cards"></span>
            </div>
            <div className="popup__field-container">
              <input type="url" name="link" className="popup__field popup__field_type_link"
                     id="popup__field_type_link-add-cards" value="" placeholder="Ссылка на картинку" required/>
              <span className="popup__error" id="error-popup__field_type_link-add-cards"></span>
            </div>
          </div>
          <button type="submit" className="popup__button-submit" id="popup__button-submit-add-cards">
            Создать
          </button>
        </PopupWithForm>
        <PopupWithForm title={'Обновить аватар'}
                       name={'edit-avatar'}
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}>
          <div className="popup__field-container popup__field-container_type_link-edit-avatar">
            <input type="url" name="link" className="popup__field popup__field_link-edit-avatar"
                   id="popup__field_type_link-edit-avatar" value="" placeholder="Ссылка на картинку" required/>
            <span className="popup__error" id="error-popup__field_type_link-edit-avatar"></span>
          </div>
          <button type="submit" className="popup__button-submit" id="popup__button-submit-edit-avatar">
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm title={'Вы уверены?'}
                       name={'delete-card'}>
          <button type="submit" className="popup__button-submit" id="popup__button-submit-delete-card">
            Да
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />
      </div>
    </div>
  )
}

export default App


