import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import pokemon from 'pokemontcgsdk'

function OpenPack() {
  const [cards, setCards] = useState([])
  const { setId } = useParams()

  useEffect( () => {
    const query = {
      q: `set.id:${setId}`
    }
    pokemon.card.where(query)
      .then(result => {
        const commons = result.data.filter(card => card.rarity === "Common")
        const uncommons = result.data.filter(card => card.rarity === "Uncommon")
        const rares = result.data.filter(card => card.rarity !== "Common" && card.rarity !== "Uncommon")
        
        if (commons.length >= 5 && uncommons.length >= 4 && rares.length >= 1) {
          const commonDraws = getCards(5, commons)
          const uncommonDraws = getCards(4, uncommons)
          const rareDraws = getCards(1, rares)
          const openedCards = [...commonDraws, ...uncommonDraws, ...rareDraws]
          setCards(openedCards)
          fetch('http://localhost:3000/cards/open-pack', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              setId: setId,
              cards: openedCards,
              dateOpened: new Date(),
              token: localStorage.getItem('token')
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              // if (data.status === 'success') {
              //   console.log('success')
              // }
            })
        } else {
          const randomCards = getCards(10, result.data)
          setCards(randomCards)
        }
      })
  }, [])

  function getCards(num, cards) {
    const randomCards = new Set()
    while (randomCards.size < num) {
      const randomIndex = Math.floor(Math.random() * cards.length)
      if (cards[randomIndex].rarity.includes('Rare') && !cards[randomIndex].supertype.includes('Pokémon')) {
        
      } else {
        randomCards.add(cards[randomIndex])
      }
    }
    return [...randomCards]
  }


  return (
    <main>
      <h1>Click To Open Your Pack!</h1>
      <div id="opened-cards-grid">
        {cards && cards.map(card => {
          return (
            <div className={`card ${card.rarity.toLowerCase().replace(' ', '')}`} data-card-id={card.id} key={card.id}>
              <img src={card.images.small} alt={card.name} />
              <h4>{card.name}</h4>
              <h5>{card.rarity}</h5>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default OpenPack