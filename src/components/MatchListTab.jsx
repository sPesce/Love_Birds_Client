import React from 'react';
import {connect} from 'react-redux';

const MatchListTab = ({matches,currentUser}) =>
{
  const isActive = (match) =>
  {
    return (match.sender_status === 2 && match.reciever_status === 2)
  }
  
  const mapMatchesToList = () =>
  {
    if(!matches || !matches[0]) return [];
    //did the current user send the match ? else false
    const userSentMatch = (match) =>
    {
      return match.user.email === currentUser.email
    }

    const activeMatches = []
    
    matches.forEach(match => {
      
      if(isActive(match))
      {
        //if I am sender, get reciever, else get sender
        const other_user = userSentMatch(match) ? match.matched_user : match.user
        activeMatches.push( 
          <li key={`match-list-${other_user.email}`}>
            {other_user.first}
          </li> )
      }
    });
    return activeMatches;    
  }

  return(
    <ul>
      {mapMatchesToList()}
    </ul>
  )

}

const mapStateToProps = state =>
{
  return {matches: state.matches,currentUser: state.currentUser};
}

export default connect(mapStateToProps)(MatchListTab);