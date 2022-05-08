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
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState('')

  useEffect(() => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res)
      })
  }, [])
  useEffect(() => {
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
    setIsDeleteCardPopupOpen(false)
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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => (
            [...state.filter(c => c._id !== card._id)]
          )
        )
      }
  )
  }
  const handleAddPlaceSubmit = ({name, link}) => {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
  }

  const handleCardDeletePopupOpen = (card) => {
    setCurrentCard(card)
    setIsDeleteCardPopupOpen(true)
  }
  const handleSuccessSubmit = (e) => {
    e.preventDefault()
    handleCardDelete(currentCard)
    closeAllPopups()
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
            onCardLike={handleCardLike}
            onCardDeletePopupOpen={handleCardDeletePopupOpen}
            cards={cards}
          />
          <Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
                         onClose={closeAllPopups}
                         onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm title='Вы уверены?'
                         name='delete-card'
                         textButton='Да'
                         isOpen={isDeleteCardPopupOpen}
                         onClose={closeAllPopups}
                         onSubmit={handleSuccessSubmit}
          />
          <ImagePopup card={selectedCard}
                      onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App


