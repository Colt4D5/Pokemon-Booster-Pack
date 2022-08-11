import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import pokemon from 'pokemontcgsdk'

function Set() {
  const [cards, setCards] = useState([])
  const { setId } = useParams()

  useEffect( () => {
    pokemon.card.all({q: `set.id:${setId}` })
      .then(result => {
          setCards(result)
      })
  }, [])

  return (
    <div id="set-grid">
      {cards && cards.map(card => {
        return (
          <div className={`card ${card.rarity}`} data-card-id={card.id} key={card.id}>
            <img src={card.images.small} alt={card.name} />
            <h4>{card.name}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Set