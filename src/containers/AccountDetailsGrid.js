import React from 'react'
import {connect} from 'react-redux'
import {Grid,Button} from 'semantic-ui-react'
import AccountDetailsRow from '../components/AccountDetailsRow'

const AccountDetailsGrid = (props) =>
{
  const {
    first,//string
    last,//string
    email,//string
    bio,//string
    zip_code,//string
    account_type,//string
    created_at, //bool
  } = props.currentUser
  const renderRows = () =>
  {
    return [
      ["Account Created", created_at],
      ["Account Type", account_type],
      ["Email Address", email],
      ["First Name",first],
      ["Last Name",last],
      ["Zip Code",zip_code],
      ["Bio",bio]
    ].map((field) => <AccountDetailsRow field={field}/>)
  }

  return( 
    <>
      <Grid celled columns={2} className="account-grid">
        {renderRows()}
      </Grid>      
        <Button positive onClick={() => props.updateEdit(true)}>Edit</Button>        
    </>
   ) 
}

const mapStateToProps = state =>
{
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(AccountDetailsGrid)