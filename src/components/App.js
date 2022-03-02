import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setselectedCard] = React.useState()
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false)

  function handleEditAvatarClick () {
setEditAvatarPopupOpen(true)
    };

    function handleEditProfileClick () {
setEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick () {
setAddPlacePopupOpen(true)
    };

  function handleCardClick (data) {
    setselectedCard(data)
    setPopupImageOpen(true)
    };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setPopupImageOpen(false)
  }

  return (
<div className="main-page">
<Header />
  <div className="main-page__container">
  <Main 
  onEditAvatar = {handleEditAvatarClick}
  onAddPlace = {handleAddPlaceClick}
  onEditProfile = {handleEditProfileClick}
  onCardClick = {handleCardClick}
  />
  <Footer />
  </div>
  <PopupWithForm name='update-avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} 
  buttonName='Создать' onClose={closeAllPopups} >
  <label className='popup__form-field'>
  <input type="url" className="popup__text popup__input" id="avatar-input" name="avatar" placeholder="Аватар"
    required minLength="2" />
  <span className="avatar-input-error popup__error"></span>
</label>
  </PopupWithForm>

  <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} 
  buttonName='Сохранить' onClose={closeAllPopups} >
  <label className='popup__form-field'>
          <input type="text" className="popup__input popup__text" id="name-input" name="name" required minLength="2"
            maxLength="40" />
          <span className="name-input-error popup__error"></span>
        </label>
        <label className='popup__form-field'>
          <input type="text" className="popup__input popup__text" id="description-input" name="description" required
            minLength="2" maxLength="200" />
          <span className="description-input-error popup__error"></span>
        </label>
  </PopupWithForm>

  <PopupWithForm name='add' title='Новое место' isOpen={isAddPlacePopupOpen} 
  buttonName='Создать' onClose={closeAllPopups} >
  <label className='popup__form-field'>
          <input type="text" className="popup__text popup__input" id="card-input" name="name" placeholder="Название"
            required minLength="2" maxLength="30" />
          <span className="card-input-error popup__error"></span>
        </label>
        <label className='popup__form-field'>
          <input type="url" className="popup__text popup__input" id="link-input" name="link"
            placeholder="Ссылка на картинку" required />
          <span className="link-input-error popup__error"></span>
        </label>
  </PopupWithForm>

  <ImagePopup 
  card={selectedCard} 
  isOpen={isPopupImageOpen}
  onClose={closeAllPopups} 
  >
  </ImagePopup>

  <div className="popup popup_confirmation">
    <div className="popup__container">
      <h2 className="popup__title popup__title_coif">Вы уверены?</h2>
      <button type="submit" className="popup__save-button popup__save-button_coinf">Да</button>
      <div>
        <button type="button" className="popup__close-button"></button>
      </div>
    </div>
  </div>
</div>
  );
}

export default App;