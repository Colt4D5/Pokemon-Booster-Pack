import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Set() {
  const [set, setSet] = useState([])
  const { setId } = useParams()

  useEffect( () => {
    console.log('Set component')
    fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setSet(data.data)
      })
  }, [])

  return (
    <div id="set-grid">
      {set && set.map(card => {
        return (
          <div className={`card ${card.rarity}`} key={card.id}>
            <img src={card.images.small} alt={card.name} />
            <h4>{card.name}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Set