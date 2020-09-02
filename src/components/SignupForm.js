import React from 'react'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {USERS_URL} from '../constants/URL.js'
import configObj from '../helpers/configObj.js'

const SignupForm = (props) => {
  
  const history = useHistory()
  const onSubmit = data => 
  {
    fetch(USERS_URL,configObj("POST",false,{user: data}))
    .then(r => r.json())
    .then(user => {
      localStorage.token = user.token
      history.push("/dashboard/")
    });
  }
  
  const { register, handleSubmit, watch, errors } = useForm();
  return (
    <form className={"ui form"} onSubmit={handleSubmit(onSubmit)}>
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
      <button className="ui button" type="submit">Submit</button>
    </form>
  );
}


export default SignupForm;