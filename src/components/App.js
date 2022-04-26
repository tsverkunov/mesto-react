import React, {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import {api} from '../utils/api'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)

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
    setSelectedCard(null)
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
        <PopupWithForm title='Редактировать профиль'
                       name='profile'
                       textButton='Сохранить'
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
        </PopupWithForm>
        <PopupWithForm title='Новое место'
                       name='add-cards'
                       textButton='Создать'
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
        </PopupWithForm>
        <PopupWithForm title='Обновить аватар'
                       name='edit-avatar'
                       textButton='Сохранить'
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}>
          <div className="popup__field-container popup__field-container_type_link-edit-avatar">
            <input type="url" name="link" className="popup__field popup__field_link-edit-avatar"
                   id="popup__field_type_link-edit-avatar" value="" placeholder="Ссылка на картинку" required/>
            <span className="popup__error" id="error-popup__field_type_link-edit-avatar"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm title='Вы уверены?'
                       name='delete-card'
                       textButton='Да'
        >
        </PopupWithForm>
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />
      </div>
    </div>
  )
}

export default App


