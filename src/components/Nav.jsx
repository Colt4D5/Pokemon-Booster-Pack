import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Nav({ user }) {

  function logOutUser(e) {
    e.preventDefault()

    fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({token: localStorage.getItem('token')})
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          localStorage.removeItem('token')
          window.location.href = data.redirect_path
        }
      })
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Featured Card</Link>
        </li>
        <li>
          <Link to="/sets">Sets</Link>
        </li>
        {user.username && (
          <li>
            <Link to="/booster-packs">Open Booster</Link>
          </li>
        )}
        {user.username ? (
          <li id="signup">Hello, { user.username }: ${ user.wallet.toFixed(2) }<br/>
          <Link to="#" onClick={logOutUser}>Log Out</Link></li> 
          ) : (
          <li id="signup">
            <Link to="/register">Log In/Sign Up</Link>
          </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Nav