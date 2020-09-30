import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import {useHistory,Redirect} from 'react-router-dom'
import {USERS_URL} from '../constants/URL.js'
import configObj from '../helpers/configObj.js'
import {Button} from 'semantic-ui-react'

const SignupForm = (props) => {
  

  const history = useHistory()
  const onSubmit = data => 
  {
    fetch(USERS_URL,configObj("POST",false,{user: data}))
    .then(r => r.json())
    .then(user => {      
      localStorage.token = user.token
    });
  }
  
  const { register, handleSubmit, watch, errors } = useForm();
  return (
    <form className={"ui form"} onSubmit={handleSubmit(onSubmit)}>
      {props.logged && <Redirect to="/dashboard/"/>}
      <h2>Signup</h2>
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
        <label htmlFor="password">Create Password</label>
        <input  name="password"
                type="password" 
                ref={register({ required: true })} 
                aria-label="password"
                aria-required="true"
                />
        {errors.password && <span>This field is required</span>}
      </div>
      <div className="field">        
        <label htmlFor="caretaker">Caretaker</label>
        <input
            key={"caretaker"}
            type="checkbox"
            name="caretaker"
            defaultChecked={false}
            ref={register}
            aria-label="caretaker"
            aria-required="false"
          />
      </div> 
      <Button color='violet' submit>Create Account</Button>  
    </form>
  );
}


export default SignupForm;