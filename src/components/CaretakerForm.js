import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button,Form} from 'semantic-ui-react'
import configObj from '../helpers/configObj'
import {ADD_CARETAKER,REMOVE_CARETAKER} from '../constants/URL'
import {removeCaretaker,setCaretaker} from '../actions/caretaker' 


const CaretakerForm = (props) => {
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur"
  });

  const addCaretaker = (email) =>
  {
    fetch(ADD_CARETAKER,configObj("POST",true,email))
    .then(r => r.json())
    .then(caretaker => props.setCaretaker(caretaker))
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

  const isCaretaker = props.currentUser.account_type === "caretaker"
  if(props.currentUser  && !props.caretaker.user)
  {
    return (
      <Form onSubmit={handleSubmit(addCaretaker)}>
        <Form.Field>
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
  if(props.currentUser && props.caretaker.user)
  {
    return(
    <>
      <h4>{isCaretaker ? "Caretaker to" : "Caretaker"}: {props.caretaker[isCaretaker ? "user" : "caretaker"]}</h4>    
      {isCaretaker && props.caretaker && <Button onClick={() => handleClick()}>Remove Caretaker Control</Button>} 
    </>
    )
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