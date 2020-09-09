import React from 'react'
import {connect} from 'react-redux'

import AccountDetailsGrid from './AccountDetailsGrid'
import AccountListDetails from './AccountListDetails.js'

const AccountDetailsTab = ({currentUser}) =>
{
  
  const isStandard = currentUser.account_type === "standard"
  console.log("standard?: ",isStandard)
  return(
    <> 
      <AccountDetailsGrid />
      {isStandard && <AccountListDetails />} 
    </>
    )
}

const mapStateToProps = state =>
{
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(AccountDetailsTab);