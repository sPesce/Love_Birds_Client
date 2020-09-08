import React,{useState} from 'react'
import SignupForm from '../components/SignupForm.js'
import LoginForm from '../components/LoginForm'
import {Button} from 'semantic-ui-react'

const SignupLogin = () =>
{
  const [signup,setSignup] = useState(true)
  return (
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        {signup ? <SignupForm /> : <LoginForm />}
        <Button basic color="black" onClick={() => setSignup(!signup)}>{signup ? "Already Have Account - Login" : "Don't Have An Account - Register"}</Button>
      </div>
    </div>
  )
}

export default SignupLogin;