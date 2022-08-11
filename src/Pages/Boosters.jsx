import React, { useState, useEffect } from 'react'
import pokemon from 'pokemontcgsdk'

function OpenPack() {
  const [sets, setSets] = useState([])

  document.title = 'Pokemon TCG | Booster Packs'

  useEffect( () => {
    pokemon.set.all()
      .then((cards) => {
        setSets(cards)
      })
  }, [])

  return (
    <main>
      <h1>Pick a Booster Pack to open</h1>
      <h2><small>(price: $3.99 each)</small></h2>
      <div id="booster-pack-wrapper">
        {sets && sets.map(set => {
          return (
            <div className="booster" key={set.id}>
              <img src={set.images.symbol} alt={set.name} />
              <h2>{set.name}</h2>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default OpenPack