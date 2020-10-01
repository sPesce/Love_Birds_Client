import React, {Component} from 'react'
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
  