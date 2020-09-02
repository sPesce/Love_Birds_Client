import React from 'react'
import {connect} from 'react-redux'

const NotificationsTab = ({notifications}) =>
{
  const renderNotifications = () =>
  {
    return notifications ? notifications.map(note => <li>{note}</li> ) : null
  }

  return (
    <div>
      <h2>Notifications:</h2>
      <ul>
        {renderNotifications()}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) =>
{
  return {notifications: state.currentUser.notifications}
}

export default connect(mapStateToProps)(NotificationsTab);