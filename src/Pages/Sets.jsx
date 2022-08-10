import React, { useState, useEffect } from 'react'

function Sets() {
  const [sets, setSets] = useState([])

  useEffect( () => {
    fetch('https://api.pokemontcg.io/v2/sets?orderBy=-number', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => setSets(data.data))
  }, [])

  return (
    <div id="sets-grid">
      {sets && sets.map(set => (
        <div key={set.id} className="set" data-set={set.id}>
          <img className="set-logo" src={set.images.logo} alt={set.name} />
          <h2>{set.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default Sets