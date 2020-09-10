import React from 'react'
import {connect} from 'react-redux'
import {Button,Grid, Container} from 'semantic-ui-react'
import {URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {updateMatch} from '../actions/matches'

const NotificationsTab = ({notifications,matches,caretaker,updateMatch,currentUser}) =>
{
  const renderNotifications = () =>
  {
    let myNotifications = [];
    if(notifications && notifications[0])
    {
      notifications.map(note => {
        return( 
        <Grid.Row key={`li-${note}`}>
          <Grid.Column>
            <strong>{note}</strong>
          </Grid.Column>
        </Grid.Row>
      ) 
      })
    }
    
    let careMessage = "test"//change me
    if(caretaker && caretaker.accepted && currentUser && caretaker.accepted !== "BOTH" )
    { 
      const {accepted} = caretaker
      if(accepted === caretaker.user)
      {
        if(currentUser.account_type === 'standard')//I sent request, i am standard user
          careMessage = `Awaiting ${caretaker.caretaker} to accept your request to be listed as your caretaker`
        else//user sent request, I am caretaker
          careMessage = `${caretaker.user} has listed you as their caretaker, awaiting your approval`
      }
      else//caretaker sent request
      {
        if(currentUser.account_type === 'standard')//caretaker sent request, i am standard user
          careMessage = `${caretaker.caretaker} wants to be listed as your caretaker, awaiting your approval`
        else//I sent the message, i am caretaker
          careMessage = `You have requested to be listed as ${caretaker.user}'s caretaker, awaiting their approval`
      }
    }
    myNotifications.push( 
      <>
        <Grid.Row className='notification-row'>
          <Grid.Column>
            <strong>{careMessage}</strong>
          </Grid.Column>
        </Grid.Row>  
        <div class="ui clearing divider"></div>
      </>
    )
    return myNotifications;
  }
  
  //these have buttons, so they will be in a grid to style
  const renderGridNotifications = () => {
    const myNotifications = []
    if(matches)
    {
      for(let i = 0; i < matches.length ; i++)
      {
        const match = {...matches[i]}
        if(match.sender_status === 2 && match.reciever_status === 0)
        {
          console.log("pushing")
          myNotifications.push(
            <>
              <Grid.Row className='notification-row' key={`${i}notification`}>
                <Grid.Column verticalAlign='middle' width={5}>
                  <strong>{`${match.sender_name} wants to match!`}</strong>
                </Grid.Column>
                <Grid.Column width={2} >
                  <Button color="blue" onClick={() => acceptMatch(true,match.id)}>Accept</Button>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button color="red" onClick={() => acceptMatch(false,match.id)}>Deny</Button>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Button >View Profile</Button>
                </Grid.Column>
              </Grid.Row>
              <div class="ui clearing divider"></div>
            </>            
          )
        }
      }
    }
    return myNotifications
  }

  const acceptMatch = (flag,m_id) =>
  {
    fetch(URL + '/matches/accept/',configObj("PATCH",true,{match: {id: m_id,accept: flag}}))
    .then(r => r.json())
    .then(data => {
      updateMatch(data)    
    })
  }

  return (
    <Container id='notifications-tab'>
      <h2>Notifications:</h2>
      <Grid columns={1}>
        {renderNotifications()}
      </Grid>
      
      <Grid columns={4}>
        {renderGridNotifications()}
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) =>
{
  return {
    notifications: state.currentUser.notifications,
    matches: state.matches,
    caretaker: state.caretaker,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,{updateMatch})(NotificationsTab);