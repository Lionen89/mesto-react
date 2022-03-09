import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup (props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
          })
    }
return (
<PopupWithForm name='add' title='Новое место' isOpen={props.isOpen} 
  buttonName='Создать' onClose={props.onClose} onSubmit={handleSubmit} >
  <label className='popup__form-field'>
          <input type="text" className="popup__text popup__input" id="card-input" name="name" placeholder="Название"
            required minLength="2" maxLength="30" ref={nameRef} />
          <span className="card-input-error popup__error"></span>
        </label>
        <label className='popup__form-field'>
          <input type="url" className="popup__text popup__input" id="link-input" name="link"
            placeholder="Ссылка на картинку" required ref={linkRef} />
          <span className="link-input-error popup__error"></span>
        </label>
  </PopupWithForm>
)
}
export default AddPlacePopup