import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button,Form} from 'semantic-ui-react'
import configObj from '../helpers/configObj'
import {ADD_CARETAKER,REMOVE_CARETAKER,ACCEPT_CARETAKER} from '../constants/URL'
import {removeCaretaker,setCaretaker} from '../actions/caretaker' 


const CaretakerForm = (props) => {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur"
  });

  const [fetchErr,setFetchErr] = useState('')

  const addCaretaker = (email) =>
  {
    fetch(ADD_CARETAKER,configObj("POST",true,email))
    .then(r => r.json())
    .then(caretaker => {
      if(caretaker.error)
        setFetchErr(caretaker.error)
      else
      {
        props.setCaretaker(caretaker);
        setFetchErr('');
      }
    })
    .catch(error => setFetchErr(error.message))
  }

  const handleClick = () =>
  {
    fetch(REMOVE_CARETAKER,configObj("GET",true))
    .then(r => r.json())
    .then(jsonR => {
      if(jsonR.error)
        alert(jsonR.error)
      else
        props.setCaretaker({caretaker: {}})
    }) 
  }

  const handleAcceptCaretaker = () =>
  {
    fetch(ACCEPT_CARETAKER,configObj("PATCH",true))
    .then(r => r.json())
    .then(caretaker => props.setCaretaker(caretaker))
  }

  const {caretaker,currentUser} = props
  const isCaretaker = currentUser.account_type === "caretaker"
  if(currentUser  && !caretaker.user)
  {
    return (
      <Form onSubmit={handleSubmit(addCaretaker)}>
        <Form.Field>
          <p>{fetchErr}</p>
          <label htmlFor="email">{isCaretaker ? "Request caretaker of user by email:" : "Add caretaker's email:"}</label>
          <input  name="email"
                type="text" 
                ref={register({required: true})}
                aria-label="email"
                aria-required="true" 
                />
        </Form.Field>      
        <Button submit primary>Request</Button>
      </Form>
    )
  }
  if(currentUser && caretaker.user)
  {
    if(caretaker.accepted === "BOTH")
    {
      return(
        <>
          <h4>{isCaretaker ? "Caretaker to" : "Caretaker"}: {caretaker[isCaretaker ? "user" : "caretaker"]}</h4>    
          {isCaretaker && caretaker && <Button onClick={() => handleClick()}>Remove Caretaker Control</Button>} 
        </>
    )}else if(caretaker.accepted === currentUser.email)
      return <h4>{`Waiting for ${isCaretaker ? "user to accept your caretaker request" : " caretaker to accept request"}`}</h4>
    else
    {
      return(
        <>
          <h4>{isCaretaker ? `${caretaker.user} added you as their caretaker` : `${caretaker.caretaker} wants to be the caretaker of your account`}</h4>
          <Button color='violet' onClick={() => handleAcceptCaretaker()}>Accept Caretaker Request</Button>
        </>
      )
    }   
    
  }
}


const mapStateToProps = state =>
{
  return {
    currentUser: state.currentUser,
    caretaker: state.caretaker,
  }
}


export default connect(mapStateToProps,{setCaretaker,removeCaretaker})(CaretakerForm)