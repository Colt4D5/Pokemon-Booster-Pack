import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import pokemon from 'pokemontcgsdk'

function Set() {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(1)
  const { setId } = useParams()

  useEffect( () => {
    pokemon.card.where({q: `set.id:${setId}`})
      .then(result => {
        console.log(result)
          setCards(result.data)
          document.title = `Pokemon TCG | ${result.data[0].set.name} `
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