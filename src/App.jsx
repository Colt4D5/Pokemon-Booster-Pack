import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import FeaturedCard from './components/FeaturedCard'
import SetsOutlet from './Pages/SetsOutlet'
import Sets from './Pages/Sets'
import Set from './Pages/Set'
import Boosters from './Pages/Boosters'
import pokemon from 'pokemontcgsdk'

import API_KEY from './utilities/key'

pokemon.configure({apiKey: API_KEY})

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<FeaturedCard />} />
        <Route path="sets" element={<SetsOutlet />}>
          <Route path=":setId" element={<Set />} />
          <Route index element={<Sets />} />
        </Route>
        <Route path="/booster-packs" element={<Boosters />} />
      </Routes>
    </div>
  )
}

export default App
