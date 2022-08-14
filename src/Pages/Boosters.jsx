import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import pokemon from 'pokemontcgsdk'

function OpenPack({ user, setUser }) {
  const [sets, setSets] = useState([])
  let navigate = useNavigate();

  document.title = 'Pokemon TCG | Booster Packs'

  useEffect( () => {
    pokemon.set.all()
      .then((cards) => {
        setSets(cards)
      })
  }, [])

  function handleOpenPack(e) {
    const id = e.target.closest('.booster').dataset.setId
    console.log(id)
    fetch('http://localhost:3000/cards/buy-booster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        setId: id,
        token: localStorage.getItem('token'),
        price: '3.99'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUser({...user, wallet: ((user.wallet * 100) - (3.99 * 100)) * 0.01})
          navigate(`/booster-packs/${id}`)
        }
      })
  }

  return (
    <main>
      <h1>Pick a Booster Pack to open</h1>
      <h2><small>(price: $3.99 each)</small></h2>
      <div id="booster-pack-wrapper">
        {sets && sets.map(set => {
          return (
            <div className="booster" data-set-id={set.id} key={set.id} onClick={handleOpenPack}>
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