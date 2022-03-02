function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }
    return(
        <article className="element">
          <div className='element__image' onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }}>
          </div>
          {/* <img src="#" alt="Фото" className="element__image" /> */}
          <button className="element__trash" type="button" aria-label="Удаление"></button>
          <div className="element__description">
            <h2 className="element__title">{`${props.card.name}`}</h2>
            <div className="element__like">
              <button type="button" className="element__heart"></button>
              <span className="element__heart-amount">{`${props.card.likes.length}`}</span>
            </div>
          </div>
        </article>
    )
}
export default Card