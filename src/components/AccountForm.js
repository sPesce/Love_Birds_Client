import React from 'react'
import {connect} from 'react-redux'

const AccountForm = props =>
{
  return( <div>accountform</div> )
}

const mapStateToProps = state =>
{
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(AccountForm)