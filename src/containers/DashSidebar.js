import React, { Component } from 'react'
import { Segment, Label, Menu , Grid} from 'semantic-ui-react'
import DashTabs from './DashTabs'
import {setCurrentTab} from '../actions/currentTab'
import {connect} from 'react-redux'
import accountIssues from '../helpers/accountIssues'

const DashboardSidebar = props => {

  const setColor = ( name , inactiveColor ) => 
  {
    return (props.currentTab === name) ? 'blue' : inactiveColor
  }

  const active = props.currentTab
  const user = props.currentUser
  return (
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>      
          <Menu.Item
            name='notifications'
            active={active === 'notifications'}
            onClick={() => props.setCurrentTab('notifications')}
          >
            <Label color={setColor('notifications','red')}>{user.notifications && user.notifications.length}</Label>
            Notifications
          </Menu.Item>

          <Menu.Item
            name='account details'
            active={active === 'account details'}
            onClick={() => props.setCurrentTab('account details')}
          >            
            Account Details
          </Menu.Item>

          <Menu.Item
            name='matches'
            active={active === 'matches'}
            onClick={() => props.setCurrentTab('matches')}
          >
            <Label color={setColor('matches','teal')}>1</Label>
            Matches
          </Menu.Item>      
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
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,{setCurrentTab})(DashboardSidebar);