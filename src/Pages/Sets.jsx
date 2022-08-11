import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pokemon from 'pokemontcgsdk'

function Sets() {
  const [sets, setSets] = useState([])
  let navigate = useNavigate();

  document.title = 'Pokemon TCG | Booster Sets'

  useEffect( () => {
    pokemon.set.all()
      .then((cards) => {
        setSets(cards)
      })
  }, [])

  function handleClickSet(e) {
    const id = e.target.closest('.set').dataset.setId
    navigate(`/sets/${id}`)
  }

  return (
    <main>
      <h1>All Booster Sets</h1>
      <div id="sets-grid">
        {sets && sets.map(set => {
          if (!set.id.includes('mcd')) {
            return (
              <div key={set.id} className="set" data-set-id={set.id} onClick={handleClickSet}>
                <img className="set-logo" src={set.images.logo} alt={set.name} />
                <h2>{set.name}</h2>
              </div>
            )
          }
        })}
      </div>
    </main>
  )
}

export default Sets