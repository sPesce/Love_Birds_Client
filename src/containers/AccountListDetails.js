import React from 'react'
import {Grid,Button} from 'semantic-ui-react'
import {useForm} from 'react-hook-form'
import {DISABILITIES_URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'

const AccountListDetails = () =>
{

  const interests = ["detail1", "detail2", "detail3"]
  const disabilities = [""]
  
  const onAddInterest = (interest) =>
  {
    console.log(interest)
  }
  const onAddDisability = (disability) =>
  {
    console.log(disability);
    fetch(DISABILITIES_URL,configObj("POST",true,disability))
    .then(r => r.json())
    .then({/*fetchuser?*/})
  }
  
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  });
  
  const renderInterestsForm = () => {    
    return (
      <form key={1} onSubmit={handleSubmit(onAddInterest)}>
        <div className="field">
          <input name="interest"
            type="text"
            ref={register({ required: true })}
            aria-label="interest"
            aria-required="true"
            />
        </div>
        <Button submit primary>Add Interest</Button>
      </form>
    )
  }

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm({
    mode: "onBlur"
  });
  
  const renderDisabilitiesForm = () =>
  {


    return (
      <form key={2} onSubmit={handleSubmit2(onAddDisability)}>
        <p><i>Note: Disabilities are private to you and your caretaker.</i></p>
        <div className="field">
          <input name="disability"
            type="text"
            ref={register2({ required: true })}
            aria-label="disability"
            aria-required="true"
          />
        </div>
        <Button submit primary>Add Disability</Button>
      </form>
    )
  }

  return (
    <>
      <Grid columns={4}>
          <Grid.Column width={3}>
            <h4><strong>Interests</strong></h4>
            {renderInterestsForm()}
          </Grid.Column>
          <Grid.Column width={4}>
            <ul>
              {interests.map((value) => <li><h5><i>{value}</i></h5></li>)}
            </ul>
          </Grid.Column>
          <Grid.Column width={3}>
            <h4><strong>Disabilities</strong></h4>
            {renderDisabilitiesForm()}
          </Grid.Column>
          <Grid.Column width={4}>
            <ul>
              {disabilities.map((value) => <li><h5><i>{value}</i></h5></li>)}
            </ul>
          </Grid.Column>
      </Grid>
    </>
  )
}


const mapStateToProps = (state) =>
  {
    return {user: state.user}
  }
  
  export default connect(mapStateToProps,{setCurrentUser})(AccountListDetails);