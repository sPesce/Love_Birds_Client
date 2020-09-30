import React from 'react'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {AUTH_URL} from '../constants/URL.js'
import configObj from '../helpers/configObj.js'
import {Button} from 'semantic-ui-react'

const LoginForm = (props) => {
  
  const history = useHistory()
  const onSubmit = data => 
  {
    fetch(AUTH_URL,configObj("POST",true,{user: data}))
    .then(r => r.json())
    .then(user => {
      if(user.error)
        alert(user.error)
      else
      {
        localStorage.token = user.token
        history.push("/dashboard/");
        props.setUser();
        console.log("fetched user");
      }
    });
  }
  
  const { register, handleSubmit, watch, errors } = useForm();
  return (
    <form className={"ui form"} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      <div className="field">
        <label htmlFor="email" >Email Address</label>
        <input  name="email"
                type="text" 
                ref={register({required: true})}
                aria-label="email"
                aria-required="true" 
                />
        {errors.email && <span>This field is required</span>}
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input  name="password"
                type="password" 
                ref={register({ required: true })} 
                aria-label="password"
                aria-required="true"
                />
        {errors.password && <span>This field is required</span>}
      </div>      
      <Button color='violet' submit>Login</Button>
    </form>
  );
}


export default LoginForm;