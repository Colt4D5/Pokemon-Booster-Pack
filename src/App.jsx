import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import FeaturedCard from './components/FeaturedCard'
import Sets from './Pages/Sets'
import Card from './components/Card'

function App() {

  function handleSearch(e) {
    setSearch(e.target.value)
    setSearchResults(cards.filter(card => card.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  function handleCardClick(e) {
    const selectedSet = e.target.closest('div.card').dataset.set
    fetch(`https://api.pokemontcg.io/v2/cards/${selectedSet}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <Nav />
      <Routes >
        <Route path='/' element={<FeaturedCard />} />
        <Route path='/sets' element={<Sets />} />
      </Routes>
    </div>
  )
}

export default App
