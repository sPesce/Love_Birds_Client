import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {USERS_URL} from '../constants/URL.js'
import configObj from '../helpers/configObj.js'
import {connect} from 'react-redux'
import {Grid} from 'semantic-ui-react'
import AccountDetailsGrid from './AccountDetailsGrid'
import AccountForm from '../components/AccountForm'
import AccountListDetails from './AccountListDetails.js'

const AccountDetailsTab = () =>
{
  

  return(
    <> 
      <AccountDetailsGrid />
      <AccountListDetails /> 
    </>
    )
}



export default AccountDetailsTab;