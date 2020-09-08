import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Grid,Button,Input} from 'semantic-ui-react'
import AccountDetailsRow from './AccountDetailsRow'
import {useForm} from 'react-hook-form'
import {USERS_URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {setCurrentUser} from '../actions/currentUser'
import CaretakerForm from '../components/CaretakerForm'

const AccountDetailsGrid = (props) =>
{  
  const [editing,updateEdit] = useState(false)
  

  const {register,handleSubmit,errors,setValue} = useForm();

  
  useEffect(() => {
    register({name: 'first'}, { required: false });
    register({name: 'last'}, { required: false });
    register({name: 'zip_code'}, { required: false });
    register({name: 'gender'}, { required: false });
    register({name: 'match_gender'}, { required: false });
    register({name: 'bio'}, { required: false });

  }, []);

  const renderRows = () =>
  {
    
    const {
      first,
      last,
      email,
      bio,
      zip_code,
      account_type,
      created_at,
      gender,
      match_gender
     
    } = props.currentUser

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
            <Input  name="first"
                    type="text"
                    defaultValue={first} 
                    onChange={(e) => handleChange(e)}
                    aria-label="first"
                    aria-required="false" 
                    />
          </div>
        ],
        [
          "Last Name",
          <div className="field">
            <Input  name="last"
                    type="text"
                    defaultValue={last} 
                    onChange={(e) => handleChange(e)}
                    aria-label="last"
                    aria-required="false" 
                    />
          </div>
        ],
        [
          "Zip Code",
          <div className="field">
            <Input  name="zip_code"
                    type="text"
                    defaultValue={zip_code}
                    onChange={(e) => handleChange(e)}
                    aria-label="zip_code"
                    aria-required="false" 
                    />
          </div>
        ],
        [
          "Gender & Matching",
          <div id="gender-form">
            I am a  
            <Input  name='gender' list='gender' placeholder={gender ? gender : 'Choose Your Gender...'} 
                    aria-label="my-gender"
                    aria-required="false"
                    onChange={(e) => handleChange(e)}
                    />
              <datalist id='gender'>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </datalist>
                and I want to match with
            <Input  name='match_gender' list='match-gender' placeholder={match_gender ? match_gender : 'Choose Gender to Match...'} 
                    aria-label="my-gender"
                    aria-required="false"
                    onChange={(e) => handleChange(e)}
                    />
              <datalist id='match-gender'>
                <option value='Male'>Males</option>
                <option value='Female'>Females</option>
                <option value='Other'>Other</option>
                <option value='Any'>Any</option>
              </datalist>
          </div>
        ],
        [
          "Bio",
          <div className="field">
            <Input  name="bio"
                    type="text"
                    defaultValue={bio} 
                    ref={register()}
                    aria-label="bio"
                    aria-required="false"
                    onChange={(e) => handleChange(e)} 
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
        [`Gender`,gender],
        ["Matching With",match_gender],
        ["Bio",bio],
      ]
    }    
    const allFields = fields.concat(conditionalFields)
    let i = 0;
    return allFields.map((field) => <AccountDetailsRow field={field} key={`acct-details-row-` + i++}/>)
   
  } 

  const onSubmit = (data) =>
  {
    debugger;
    fetch(USERS_URL + "update/",configObj("PATCH",true,{user: data}))
    .then(r => r.json())
    .then(data  =>  props.setCurrentUser(data.data.attributes))
    .then(() => updateEdit(false))
  }

  const handleChange = ({target}) =>
  {
    setValue(target.name,target.value)
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
      <Grid columns={2}>
        <Grid.Column>
          <h2>Basic Info:</h2> 
          <h4><i>Note: Editing name flags account to be unverified.</i></h4>
          <h4><i>Please allow 24 hours after updates for verification.</i></h4>
        </Grid.Column>
        <Grid.Column>
          <CaretakerForm />
        </Grid.Column>
      </Grid>      
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