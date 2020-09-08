import React from 'react'
import {Grid,Button} from 'semantic-ui-react'
import {useForm} from 'react-hook-form'
import {DISABILITIES_URL, INTERESTS_URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {connect} from 'react-redux'
import {setInterests} from '../actions/interests'
import {setDisabilities} from '../actions/disabilities'

const AccountListDetails = (props) =>
{
  const onAddInterest = (interest) =>
  {
    fetch(INTERESTS_URL,configObj("POST",true,interest))
    .then(r => r.json())
    .then(data => props.setInterests(data.data.map(interest => interest.attributes.name)))
    reset();
  }
  const onAddDisability = (disability) =>
  {
    fetch(DISABILITIES_URL,configObj("POST",true,disability))
    .then(r => r.json())
    .then(data => props.setDisabilities(data.data.map(disability => disability.attributes.name)))
    reset2();
  }
  
  const { register, errors, handleSubmit, reset } = useForm({
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
    reset: reset2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm({
    mode: "onBlur",
    defaultValues: {disability: ""}
  });

  
  
  const renderDisabilitiesForm = () =>
  {


    return (
      <form key={2} onSubmit={handleSubmit2(onAddDisability)}>
        <div className="field">
          <input name="disability"
            type="text"
            ref={register2({ required: true })}
            aria-label="disability"
            aria-required="true"
            />
        </div>
        <Button submit primary>Add Disability</Button>
        <p><i>Note: Disabilities are private to you and your caretaker.</i></p>
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
            <div className="cell list">
              <ul>
                {props.interests.map((value) => <li><h5><i>{value}</i></h5></li>)}
              </ul>
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
            <h4><strong>Disabilities</strong></h4>
            {renderDisabilitiesForm()}
          </Grid.Column>
          <Grid.Column width={4}>
            <div className="cell list">
              <ul>
                {props.disabilities && props.disabilities.map((value) => <li><h5><i>{value}</i></h5></li>)}
              </ul>
            </div>
          </Grid.Column>
      </Grid>
    </>
  )
}


const mapStateToProps = (state) =>
{
    return {
      user: state.currentUser,
      disabilities: state.disabilities,
      interests: state.interests
    };
}
  
  export default connect(mapStateToProps,{setDisabilities,setInterests})(AccountListDetails);