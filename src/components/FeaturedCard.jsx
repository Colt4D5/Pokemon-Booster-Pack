import React, { useState, useEffect } from 'react'
import SetIds from '../utilities/sets'
import pokemon from 'pokemontcgsdk'

function FeaturedCard() {
  const [featuredCard, setFeaturedCard] = useState({})

  document.title = 'Pokemon TCG | Featured Card'

  useEffect( () => {
    pokemon.set.all()
      .then((sets) => {
          return sets
      })
      .then(sets => {
        const setId = sets[Math.floor(Math.random() * sets.length)].id
        return pokemon.card.all({q: `set.id:${setId}` })
      })
      .then(cards => {
        const feature = cards[Math.floor(Math.random() * cards.length)]
        // console.log(feature);
        setFeaturedCard(feature)
    })
  }, [])

  return (
    <>
      {featuredCard.images && (
        <div id="featured-card">
          <div className="featured-image">
            <img src={featuredCard.images.small} alt={featuredCard.name} />
          </div>
          <div className="featured-details">
            <h2>{featuredCard.name}</h2>
            {featuredCard.nationalPokedexNumbers && (
              <h4><b>Pokedex Entry:</b> #{featuredCard.nationalPokedexNumbers[0]}</h4>
            )}
            {featuredCard.hp && <h4><b>HP:</b> {featuredCard.hp}</h4>}
            {featuredCard.rarity && (
              <h4><b>Rarity:</b> {featuredCard.rarity}</h4>
            )}
            {featuredCard.attacks && (
              <>
                <h4 className="attacks"><b>Attacks:</b></h4> 
                <ul>{featuredCard.attacks && featuredCard.attacks.map(attack => (
                    <li key={attack.name}>{attack.name} {attack.damage && `- ${attack.damage}`}</li>
                  ))}
                </ul>
              </>
            )
            }
          </div>
        </div>
      )}
    </>
  )
}

export default FeaturedCard