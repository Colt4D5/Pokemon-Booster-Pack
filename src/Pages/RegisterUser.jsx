import React from 'react'
import { Link } from 'react-router-dom'

function RegisterUser() {

  function handleLogInClick(e) {
    e.preventDefault()
    document.querySelector('form#register-form').style.display = 'none'
    document.querySelector('form#login-form').style.display = ''
  }
  
  function handleRegisterClick(e) {
    e.preventDefault()
    document.querySelector('form#login-form').style.display = 'none'
    document.querySelector('form#register-form').style.display = ''
  }

  function handleSubmitLogin(e) {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    }
    )
    // console.log(data)

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          localStorage.setItem('token', data.token)
          window.location.href = '/'
        }
      })
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <form id="register-form" action="http://localhost:3000/users" method="POST">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required /><br/>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required /><br/>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required /><br/>
        <label htmlFor="email">Email Address</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="confirmEmail">Confirm Email</label>
        <input type="text" id="confirmEmail" name="confirmEmail" required /><br/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required /><br/>
        <button type="submit">Register</button>
        <div id="login-text">
          <p>Already have an account?</p>
          <Link to="#" onClick={handleLogInClick}>Log In</Link>
        </div>
      </form>

      <form id="login-form" style={{display: 'none'}} onSubmit={handleSubmitLogin} action="http://localhost:3000/users/login" method="POST">
        <label htmlFor="email">Email Address</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required /><br/>
        <button type="submit">Sign In</button>
        <div id="login-text">
          <p>Don't have an account?</p>
          <Link to="#" onClick={handleRegisterClick}>Log In</Link>
        </div>
      </form>
    </main>
  )
}

export default RegisterUser