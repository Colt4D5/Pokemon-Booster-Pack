import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import FeaturedCard from './components/FeaturedCard'
import SetsOutlet from './Pages/SetsOutlet'
import Sets from './Pages/Sets'
import Set from './Pages/Set'
import Boosters from './Pages/Boosters'
import BoostersOutlet from './Pages/BoostersOutlet'
import RegisterUser from './Pages/RegisterUser'
import OpenPack from './Pages/OpenPack'

import pokemon from 'pokemontcgsdk'

import API_KEY from './utilities/key'

pokemon.configure({apiKey: API_KEY})

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/users/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({token: localStorage.getItem('token')})
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedInUser) {
          setUser(data.loggedInUser)
        }
      })
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<FeaturedCard />} />
        <Route path="sets" element={<SetsOutlet />}>
          <Route path=":setId" element={<Set />} />
          <Route index element={<Sets />} />
        </Route>
        <Route path="booster-packs" element={<BoostersOutlet />}>
          <Route path=":setId" element={<OpenPack />} />
          <Route index element={<Boosters user={ user } setUser={ setUser } />} />
        </Route>
        <Route path="register" element={<RegisterUser />} />
      </Routes>
    </div>
  )
}

export default App
