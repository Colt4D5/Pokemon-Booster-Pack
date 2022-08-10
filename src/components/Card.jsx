import React from 'react'

function Card({ card }) {
  return (
    <div className={`card ${card.rarity.replace(' ', '-').toLowerCase()}`} key={card.id}>
      <img className="card-img" src={card.images.small} alt={card.name} />
      <h3 className="card-name">{card.name}</h3>
      <p className="rarity">{card.rarity}</p>
    </div>
  )
}

export default Card