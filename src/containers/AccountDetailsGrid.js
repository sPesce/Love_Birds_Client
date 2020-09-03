import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Grid,Button} from 'semantic-ui-react'
import AccountDetailsRow from './AccountDetailsRow'
import {useForm} from 'react-hook-form'
import {USERS_URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {setCurrentUser} from '../actions/currentUser'

const AccountDetailsGrid = (props) =>
{  
  const [editing,updateEdit] = useState(false)
  const {
    first,
    last,
    email,
    bio,
    zip_code,
    account_type,
    created_at, 
  } = props.currentUser

  const {register,handleSubmit,errors} = useForm();
  const renderRows = () =>
  {
    const fields = [
      ["Account Created", created_at],
      ["Account Type", account_type],
      ["Email Address", email]  
    ]
    let conditionalFields;

    if(editing)
    {
      conditionalFields = 
      [
        [
          "First Name",
          <div className="field">
            <input  name="first"
                    type="text"
                    value={first} 
                    ref={register({required: true})}
                    aria-label="first"
                    aria-required="true" 
                    />
          </div>
        ],
        [
          "Last Name",
          <div className="field">
            <input  name="last"
                    type="text"
                    value={last} 
                    ref={register({required: true})}
                    aria-label="last"
                    aria-required="true" 
                    />
          </div>
        ],
        [
          "Zip Code",
          <div className="field">
            <input  name="zip_code"
                    type="text"
                    value={zip_code} 
                    ref={register({required: true})}
                    aria-label="zip_code"
                    aria-required="true" 
                    />
          </div>
        ],
        [
          "Bio",
          <div className="field">
            <input  name="bio"
                    type="text"
                    value={bio} 
                    ref={register({required: true})}
                    aria-label="bio"
                    aria-required="true" 
                    />
          </div>
        ]      
      ]
    }
    else
    {
      conditionalFields = 
      [
        ["First Name",first],
        ["Last Name",last],
        ["Zip Code",zip_code],
        ["Bio",bio]      
      ]
    }    
    const allFields = fields.concat(conditionalFields)
    return allFields.map((field) => <AccountDetailsRow field={field}/>)
   
  } 

  const onSubmit = (data) =>
  {
    fetch(USERS_URL + "update/",configObj("PATCH",true,{user: data}))
    .then(r => r.json())
    .then(data  =>  props.setCurrentUser({user: data.data.attributes}))
    .then(() => updateEdit(false))
  }

  const generateBasicButtons = () =>
  {
    if (!editing)
      return <Button positive onClick={() => updateEdit(true)}>Edit Basic Info</Button>
    else//IS editing
    {
      return(
        <Button.Group>
          <Button onClick={() => updateEdit(false)}>Cancel</Button>
          <Button.Or />
          <Button submit color="purple">Save</Button>
        </Button.Group>
        )
    }
  }

  return(
    <>
      <h2>Basic Info:</h2> 
      <h4><i>Note: Editing name flags account to be unverified.</i></h4>
      <h4><i>Please allow 24 hours after updates for verification.</i></h4>
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Grid celled columns={2} className="account-grid">
          {renderRows()}
        </Grid>
        { generateBasicButtons() }
      </form>      
    </>        
   ) 
}

const mapStateToProps = state =>
{
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps,{setCurrentUser})(AccountDetailsGrid)