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
          <Link to="/booster-packs">Open Booster</Link>
        </li>
        <li id="signup">
          <Link to="/register">Log In/Sign Up</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav