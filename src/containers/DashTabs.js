import React from "react"
import {Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import AccountDetailsTab from '../components/AccountDetailsTab'
import MatchesTab from '../components/MatchesTab'
import NotificationsTab from '../components/NotificationsTab'

const DashTabs = ({currentTab}) =>
{
  const renderTab = () =>
  {
    const renderObj = 
    {
      "account details": <AccountDetailsTab />,
      "matches": <MatchesTab />,
      'notifications': <NotificationsTab />
    }
    return renderObj[currentTab];
  }
  return( 
    <Grid.Column  width={12}>
      <Segment>
        <p>{renderTab()}</p>
      </Segment>
    </Grid.Column> )
}

const mapStateToProps = (state) =>
{
   return {currentTab: state.currentTab}
}

export default connect(mapStateToProps)(DashTabs);