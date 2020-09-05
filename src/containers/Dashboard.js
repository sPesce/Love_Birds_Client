import React, {Component,history} from 'react'
import {useHistory} from 'react-router-dom'
import configObj from '../helpers/configObj'
import {URL,DISABILITIES_URL} from '../constants/URL'
import DashSidebar from '../containers/DashSidebar'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'
import {setDisabilities} from '../actions/disabilities'
import {setInterests} from '../actions/interests'


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
      const userData = data.data.attributes      
      this.props.setCurrentUser(userData)
      let interests = []
      let disabilities = []
      data.included.forEach((record) => {
        const {type} = record
        const {name} = record.attributes
        if(type === "disability")
          disabilities.push(name)
        else if (type === "interest")
          interests.push(name)
      })
      console.log(interests)
      console.log(disabilities)
      this.props.setInterests(interests);
      this.props.setDisabilities(disabilities);
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
  
  export default connect(mapStateToProps,{setCurrentUser,setDisabilities,setInterests})(Dashboard);
  
  
  // {debugger}
