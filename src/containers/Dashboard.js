import React, {Component,history} from 'react'
import {useHistory} from 'react-router-dom'
import configObj from '../helpers/configObj'
import {URL,DISABILITIES_URL} from '../constants/URL'
import DashSidebar from '../containers/DashSidebar'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'
import {setDisabilities} from '../actions/disabilities'
import {setInterests} from '../actions/interests'
import {setMatches} from '../actions/matches'


class Dashboard extends Component
{
  render(){
    const {user} = this.props
    return(
        <DashSidebar />
      ) 
    }
  }
  
  const mapStateToProps = (state) =>
  {
    return {user: state.user}
  }
  
  export default connect(mapStateToProps,{setCurrentUser,setDisabilities,setInterests,setMatches})(Dashboard);
  