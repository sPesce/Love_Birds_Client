import React,{useState} from 'react'
import SignupForm from '../components/SignupForm.js'
import LoginForm from '../components/LoginForm'
import {Button,Image} from 'semantic-ui-react'
import logoLong from '../images/logoLong.png'
const SignupLogin = (props) =>
{
  const [signup,setSignup] = useState(true)
  return (
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        <Image src={logoLong} />
        {props.content && props.content}
      </div>
    </div>
  )
}

export default SignupLogin;