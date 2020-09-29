import React from "react"
import {Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import AccountDetailsTab from './AccountDetailsTab'
import NotificationsTab from '../components/NotificationsTab'
import ChatsTab from '../containers/ChatsTab'
import {Redirect} from 'react-router-dom'

const DashTabs = ({currentTab}) =>
{
  const renderTab = () =>
  {
    const renderObj = 
    {
      "account details": <AccountDetailsTab />,
      'notifications': <NotificationsTab />,
      'chats': <ChatsTab />
    }
    return renderObj[currentTab];
  }
  return( 
    <Grid.Column  width={12}>
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