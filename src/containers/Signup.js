import React from 'react'
import SignupForm from '../components/SignupForm.js'

const Signup = () =>
{
  return (
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup;