import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import FeaturedCard from './components/FeaturedCard'
import SetsOutlet from './Pages/SetsOutlet'
import Sets from './Pages/Sets'
import Set from './Pages/Set'
import OpenPack from './Pages/OpenPack'

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
        <Route path="/open-booster-pack" element={<OpenPack />} />
      </Routes>
    </div>
  )
}

export default App
