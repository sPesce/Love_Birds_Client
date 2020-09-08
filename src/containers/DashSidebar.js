import React, { useEffect } from 'react'
import { Segment, Label, Menu , Grid} from 'semantic-ui-react'
import DashTabs from './DashTabs'
import {setCurrentTab} from '../actions/currentTab'
import {setCaretaker} from '../actions/caretaker'
import {connect} from 'react-redux'
import accountIssues from '../helpers/accountIssues'
import {useHistory} from 'react-router-dom'
import {URL} from '../constants/URL'
import configObj from '../helpers/configObj'

const DashboardSidebar = props => {

  useEffect(() => {
    fetch(URL+ 'caretaker/',configObj("GET",true))
    .then(r => r.json())
    .then( caretaker => {
      if(!caretaker.error)
        props.setCaretaker(caretaker)
    })
  },[]);

  const setColor = ( name , inactiveColor ) => 
  {
    return (props.currentTab === name) ? 'blue' : inactiveColor
  }
  const history = useHistory()
  const active = props.currentTab
  const user = props.currentUser

  const getTitles = () =>
{
  const {account_type} = user

  const titles = {
    standard: 
    [
      {
        title: "notifications",
        icon: <Label color={setColor('notifications','red')} key={"notification-label"}>
          {user.notifications && user.notifications.length}</Label>},
      {
        title: "account details", 
        icon: null
      },
      {
        title: "matches", 
        icon: <Label color={setColor('matches','teal')} key="matches label">1</Label>
      },
      {
        title: "find matches",
        icon: null
      }
    ],
    caretaker:
    [
      {
        title: "notifications",
        icon: <Label color={setColor('notifications','red')}key="notifications label">
          {user.notifications && user.notifications.length}</Label>},
      {
        title: "account details", 
        icon: null
      },
      {
        title: "activity", 
        icon: <Label color={setColor('activity','teal')}key="activity label">10</Label>
      }      
    ]
  }
  return titles[account_type]
}
  
  const mapMenuItems = () =>
  {
    const titles = getTitles();
    if (!titles) return ""
    return titles.map(({title,icon}) => {
      return(
        <Menu.Item key={`menu-${title}`}
          name={title}
          active={active === title}
          onClick={() => props.setCurrentTab(title)}
          >
            {icon}
            {title}
          </Menu.Item>
      )
    })
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>      
          {props.currentUser && mapMenuItems()}   
        </Menu>
      </Grid.Column>
      <DashTabs />
    </Grid>
  )
}



const mapStateToProps = (state) =>
{
  return {
    currentTab: state.currentTab,
    currentUser: state.currentUser,
    caretaker: state.caretaker
  }
}

export default connect(mapStateToProps,{setCurrentTab,setCaretaker})(DashboardSidebar);