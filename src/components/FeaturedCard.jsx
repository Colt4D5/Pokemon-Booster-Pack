import React, { useState, useEffect } from 'react'
import SetIds from '../utilities/sets'

function FeaturedCard() {
  const [featuredCard, setFeaturedCard] = useState({})

  useEffect( () => {
    const randomSet = SetIds[Math.floor(Math.random() * SetIds.length)]
    fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${randomSet}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setFeaturedCard(data.data[Math.floor(Math.random() * data.data.length)])
      } )
    // fetch('https://api.pokemontcg.io/v2/sets?select=id', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data.data);
    //     return data.data[Math.floor(Math.random() * data.data.length)].id 
    //   })
    //   .then(setId => fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log(data)
    //       setFeaturedCard(data.data[Math.floor(Math.random() * data.data.length)])
    //     } ))
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
            <h4><b>HP:</b> {featuredCard.hp}</h4>
            <h4><b>Rarity:</b> {featuredCard.rarity}</h4>
            <h4 className="attacks"><b>Attacks:</b></h4> 
            <ul>{featuredCard.attacks && featuredCard.attacks.map(attack => (
                <li key={attack.name}>{attack.name} {attack.damage && `- ${attack.damage}`}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default FeaturedCard