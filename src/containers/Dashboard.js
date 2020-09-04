import React, {Component,history} from 'react'
import {useHistory} from 'react-router-dom'
import configObj from '../helpers/configObj'
import {URL} from '../constants/URL'
import DashSidebar from '../containers/DashSidebar'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'


class Dashboard extends Component
{
  state = {
    activeTab: 'notifications',
    accountIssues: []
  }  

  componentDidMount(){
    (!localStorage.token && history.push('/landing/'))
    fetch(URL + "find_user/", configObj("GET",true))
    .then(r => r.json())
    .then(data => {
      console.log(data)
      const userData = {user: data.data.attributes}
      userData.user.disabilities = [...data.data.relationships.disabilities.data]
      this.props.setCurrentUser(userData)
    })
  };
  render(){
    console.log(this.props.user);
    const {user} = this.props
    return(
      <div>
        <DashSidebar />
      </div>
      ) 
      
    }
    
  }
  
  const mapStateToProps = (state) =>
  {
    return {user: state.user}
  }
  
  export default connect(mapStateToProps,{setCurrentUser})(Dashboard);
  
  
  // {debugger}
