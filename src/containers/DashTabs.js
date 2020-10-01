import React from "react"
import {Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import AccountDetailsTab from './AccountDetailsTab'
import NotificationsTab from '../components/NotificationsTab'
import ChatsTab from '../containers/ChatsTab'
import {Redirect} from 'react-router-dom'
import MatchListTab from '../components/MatchListTab'

const DashTabs = ({currentTab}) =>
{
  const renderTab = () =>
  {
    const renderObj = 
    {
      "account details": <AccountDetailsTab key={'acc-details'}/>,
      'notifications': <NotificationsTab key={'notifications-tab'}/>,
      'chats': <ChatsTab key={'chats'}/>,
      'matches': <MatchListTab key={'matches'}/>
    }
    return renderObj[currentTab];
  }
  return( 
    <Grid.Column  width={12} key='width-12-grid-col'>
      <Segment>
        {renderTab()}
      </Segment>
    </Grid.Column> )
}

const mapStateToProps = (state) =>
{
   return {currentTab: state.currentTab}
}

export default connect(mapStateToProps)(DashTabs);