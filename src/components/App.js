import React, {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import {api} from '../utils/api'
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res)
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
  const handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
  }
  const handleUpdateAvatar = ({avatar}) => {
    api.setUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header/>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
          />
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
          {/*<PopupWithForm title='Обновить аватар'*/}
          {/*               name='edit-avatar'*/}
          {/*               textButton='Сохранить'*/}
          {/*               isOpen={isEditAvatarPopupOpen}*/}
          {/*               onClose={closeAllPopups}*/}
          {/*               // onSubmit={handleSubmit}*/}
          {/*>*/}
          {/*  <div className="popup__field-container popup__field-container_type_link-edit-avatar">*/}
          {/*    <input type="url" name="link" className="popup__field popup__field_link-edit-avatar"*/}
          {/*           id="popup__field_type_link-edit-avatar" value="" placeholder="Ссылка на картинку" required/>*/}
          {/*    <span className="popup__error" id="error-popup__field_type_link-edit-avatar"></span>*/}
          {/*  </div>*/}
          {/*</PopupWithForm>*/}

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}
          />
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
    </CurrentUserContext.Provider>
  )
}

export default App


