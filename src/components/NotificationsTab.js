import React, {useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import {Button,Grid, Container} from 'semantic-ui-react'
import {URL} from '../constants/URL'
import configObj from '../helpers/configObj'
import {updateMatch} from '../actions/matches'
import {setCaretaker} from '../actions/caretaker'



const NotificationsTab = ({matches,caretaker,updateMatch,currentUser,setCaretaker}) =>
{

  useEffect(() => {
    fetch(URL+ 'caretaker/',configObj("GET",true))
    .then(r => r.json())
    .then( caretaker => {
      if(!caretaker.error)
        setCaretaker(caretaker)
    })    
  },[caretaker,setCaretaker]);


  const renderNotifications = () =>
  {
    let notifications;
    
    if (currentUser && currentUser.notifications )
      notifications = [...currentUser.notifications]
    let myNotifications = [];
    if(notifications && notifications[0])
    {
      myNotifications =  notifications.map(note => {
        return( 
        <Grid.Row key={`li-${note}`}>
          <Grid.Column key={`col-of-${note}-row`}>
            <strong>{note}</strong>
          </Grid.Column>
        </Grid.Row>
      ) 
      })
    }

    const careMessage = () =>
    {
      if(!!caretaker && (!!caretaker.accepted) && (caretaker.accepted !== "BOTH"))
      { 
        const {accepted} = caretaker
        if( accepted !== "" && accepted === caretaker.user)
        {
          if(currentUser.account_type === 'standard')//I sent request, i am standard user
            return `Awaiting ${caretaker.caretaker} to accept your request to be listed as your caretaker`;
          else//user sent request, I am caretaker
            return `${caretaker.user} has listed you as their caretaker, awaiting your approval`;
        }
        else//caretaker sent request
        {
          if(currentUser.account_type === 'standard')//caretaker sent request, i am standard user
            return `${caretaker.caretaker} wants to be listed as your caretaker, awaiting your approval`;
          else//I sent the message, i am caretaker
            return `You have requested to be listed as ${caretaker.user}'s caretaker, awaiting their approval`;
        }
      } else return null;
    }
    
   
    if (!!caretaker && !!caretaker.accepted)
    {
      myNotifications.push( 
        <Fragment key='care-notification-x'>
          <Grid.Row className='notification-row' key={`notif-row-caretaker`}>
            <Grid.Column key={`col-in-notif-row`}>
              <strong>{careMessage()}</strong>
            </Grid.Column>
          </Grid.Row>  
          <div className="ui clearing divider"></div>
        </Fragment>
      ) 
    }
      
    return myNotifications;
  }
  
  //these have buttons, so they will be in a grid to style
  const renderMatchNotifications = () => {
    let myNotifications = []
    if(matches)
    {
      for(let i = 0; i < matches.length ; i++)
      {
        const match = {...matches[i]}
        if(match.sender_status === 2 && match.reciever_status === 0)
        {
          myNotifications.push(
            <Fragment key={`notif-frag-${i}`}>
              <Grid.Row className='notification-row' key={`${i}notification`}>
                <Grid.Column verticalAlign='middle' width={5} key={`notif-cell-${i}-0`}>
                  <strong key={`strong${i}`}>{`${match.user.first} wants to match!`}</strong>
                </Grid.Column>
                <Grid.Column width={2} key={`notif-cell-${i}-1`}>
                  <Button color="blue" onClick={() => acceptMatch(true,match.id)} key={`${i}-button-accept`}>Accept</Button>
                </Grid.Column>
                <Grid.Column width={2} key={`notif-cell-${i}-2`}>
                  <Button color="red" onClick={() => acceptMatch(false,match.id)} key={`${i}-button`}>Deny</Button>
                </Grid.Column>
                <Grid.Column width={4} key={`notif-cell-${i}-3`}>
                  <Button key={`${i}-button-view-prof`}>View Profile</Button>
                </Grid.Column>
              </Grid.Row>
              <div className="ui clearing divider"></div>
            </Fragment>            
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

  const renderAll = () =>
  {
    const listNotes = renderNotifications();
    const gridNotes = renderMatchNotifications();

    if (!listNotes[0] && !gridNotes[0])
      return <h3 key='h3-no-notes'>You do not have any notifications</h3>
    else
    {        
      return(
        <Fragment key={`notif-frag-main-list`}>
          <h2>Notifications:</h2>
          <Grid columns={1} key='notif-grid-1-col'>{listNotes}</Grid>
          <Grid columns={4} key='notif-grid-4-col'>{gridNotes}</Grid>
        </Fragment>
      )
    }
  }

  return (
    <Container id='notifications-tab' key='notif-tab-cont'>
      {renderAll()}
    </Container>
  )
}




const mapStateToProps = (state) =>
{
  return {
    matches: state.matches,
    caretaker: state.caretaker,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,{updateMatch,setCaretaker})(NotificationsTab);