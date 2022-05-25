import React, {useEffect, useState} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import {api} from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ProtectedRout from './ProtectedRout'
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/auth'
import MobileMenu from './MobileMenu'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState({})
  const [preloader, setPreloader] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const history = useHistory()

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profile, cards]) => {
        setCurrentUser(profile)
        setCards(cards)
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/cards')
    }
  }, [history, loggedIn])

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
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard(null)
  }
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  const handleCardDeletePopupOpen = (card) => {
    setCurrentCard(card)
    setIsDeleteCardPopupOpen(true)
  }
  const handleUpdateUser = ({name, about}) => {
    setPreloader(true)
    api.setUserInfo(name, about)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setPreloader(false))
  }
  const handleUpdateAvatar = ({avatar}) => {
    setPreloader(true)
    api.setUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setPreloader(false))
  }
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.log)
  }
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => [...state.filter(c => c._id !== card._id)])
      })
      .catch(console.log)
  }
  const handleAddPlaceSubmit = ({name, link}) => {
    setPreloader(true)
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
      .finally(() => setPreloader(false))
  }
  const handleSuccessSubmit = (e) => {
    e.preventDefault()
    handleCardDelete(currentCard)
    closeAllPopups()
  }

  const handleRegister = (formValues) => {
    auth.register(formValues)
      .then(() => {
        setIsSuccess(true)
        setIsInfoTooltipPopupOpen(true)
        history.push('/sign-in')
      })
      .catch(error => {
        setErrorMessage(error.message)
        setIsSuccess(false)
        setIsInfoTooltipPopupOpen(true)
      })
  }
  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt')
      auth.getUserData(jwt).then((res) => {
        setLoggedIn(true)
        setOwnerEmail(res.data.email)
      })
    }
  }
  const handleLogin = (formValue) => {
    auth.authorized(formValue)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
        }
        checkToken()
      })
  }
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const signOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setOwnerEmail('')
    setIsMobileMenuOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <MobileMenu
            loggedIn={loggedIn}
            ownerEmail={ownerEmail}
            onSignOut={signOut}
            isOpen={isMobileMenuOpen}
          />
          <Header
            loggedIn={loggedIn}
            ownerEmail={ownerEmail}
            onSignOut={signOut}
            onToggleMobileMenu={handleMobileMenuToggle}
          />
          <Switch>
            <Route exact path="/">
              {loggedIn ? <Redirect to="/cards"/> : <Redirect to="/sign-in"/>}
            </Route>
            <ProtectedRout path="/cards" loggedIn={loggedIn}>
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
            </ProtectedRout>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onSendData={handleLogin}
                title="Вход"
                buttonText="Войти"
              />
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            preloader={preloader}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            preloader={preloader}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            preloader={preloader}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            textButton="Да"
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleSuccessSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
