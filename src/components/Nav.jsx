import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Featured Card</Link>
        </li>
        <li>
          <Link to="/sets">Sets</Link>
        </li>
        <li>
          <Link to="/cards">Cards</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav