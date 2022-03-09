import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import ApiReact from '../utils/API'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CoinformationPopup from './CoinformationPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isCoinfPopupOpen, setCoinfPopupOpen] = React.useState(false)
  const [selectedCard, setselectedCard] = React.useState({})
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    ApiReact.getProfileData()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
    },[])
  React.useEffect(() => {
      ApiReact.getInitialCards()
        .then((data) => {
          setCards(data)
        })
        .catch((err) => console.log(`Ошибка: ${err.status}`))
    },[])

  function handleEditAvatarClick () {
setEditAvatarPopupOpen(true)
    };

    function handleEditProfileClick () {
setEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick () {
setAddPlacePopupOpen(true)
    };

    function handleTrashClick () {
      setCoinfPopupOpen(true)
    };

  function handleCardClick (data) {
    setselectedCard(data)
    setPopupImageOpen(true)
    };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setCoinfPopupOpen(false)
    setPopupImageOpen(false)
  }
  function handleUpdateUser (data) {
    ApiReact.editProfile(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
    }
  function handleUpdateAvatar(url) {
      ApiReact.setNewAvatar(url)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
    }
  function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      // Отправляем запрос в API и получаем обновлённые данные карточки
      ApiReact.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }
  
  function checkCard(element,card){
    return element._id !== card._id
  }
  
  function handleCardDelete(card){
      let newCards = cards.filter(element => checkCard(element, card))
        // let ert = Object.values(element).includes(card._id)
      ApiReact.deleteCard(card._id)
      .then(() => {
          setCards(newCards);
      });
    }
  function handleAddPlaceSubmit(newCard) {
    ApiReact.addNewCard(newCard)
    .then((newCards) => {
      setCards([newCards, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка: ${err.status}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
<div className="main-page">
<Header />
  <div className="main-page__container">
  <Main 
  onEditAvatar = {handleEditAvatarClick}
  onAddPlace = {handleAddPlaceClick}
  onEditProfile = {handleEditProfileClick}
  onCardClick = {handleCardClick}
  cards = {cards}
  onCardLike = {handleCardLike}
  onCardDelete = {handleCardDelete}
  // onCoinfPopup = {handleTrashClick}
  />
  <Footer />
  </div>
  <EditAvatarPopup 
  isOpen={isEditAvatarPopupOpen} 
  onClose={closeAllPopups} 
  onUpdateAvatar={handleUpdateAvatar} />

  <EditProfilePopup 
  isOpen={isEditProfilePopupOpen} 
  onClose={closeAllPopups} 
  onUpdateUser={handleUpdateUser} /> 

  <AddPlacePopup 
  isOpen={isAddPlacePopupOpen} 
  onClose={closeAllPopups} 
  onAddPlace={handleAddPlaceSubmit} />

  <ImagePopup 
  card={selectedCard} 
  isOpen={isPopupImageOpen}
  onClose={closeAllPopups} >
  </ImagePopup>

  {/* <CoinformationPopup 
  isOpen={isCoinfPopupOpen}
  onClose={closeAllPopups}
  onCardDelete = {handleCardDelete}
   /> */}
</div>
</CurrentUserContext.Provider>
  );
}

export default App;
