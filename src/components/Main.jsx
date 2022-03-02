import React from 'react'
// import avatarImage from '../images/Jacques-Yves.Cousteau.jpeg'
import ApiReact from '../utils/API'
import Card from './Card'

function Main(props) {
  const [userName, setUserName] = React.useState({})
  const [userDescription, setUserDescription] = React.useState({})
  const [userAvatar, setUserAvatar] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    ApiReact.getProfileData()
      .then((data) => {
        setUserAvatar(data.avatar)
        setUserName(data.name)
        setUserDescription(data.about)
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
  })

  React.useEffect(() => {
    ApiReact.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
  })

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <div className='profile__avatar' style={{ backgroundImage: `url(${userAvatar})` }}>
          </div>
          {/* <img src={avatarImage} alt="Жак Ив Кусто" className="profile__avatar" /> */}
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{`${userName}`}</h1>
          <button type="button" aria-label="Close" className="profile__edit-button"
            onClick={props.onEditProfile}
          >
          </button>
          <p className="profile__description">{`${userDescription}`}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item, i) => {
          return (
  <Card 
  card={item} 
  key={i}
  onCardClick={props.onCardClick} />
          )}
        )}

      </section>
    </main>

  )
}

export default Main