import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid,Image,Icon} from 'semantic-ui-react'

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
        const {Row,Column} = Grid

        //if I am sender, get reciever, else get sender
        const other_user = userSentMatch(match) ? match.matched_user : match.user
        const mail = other_user.email
        const pic = smallPic(other_user.pic);
        
        activeMatches.push(
            <Row key={`match-row-${mail}`}>
              <Column width={2} key={`match-col-0-${mail}`}>
                <Image  className="matches-list-small-pic" 
                        src={pic} 
                        />
              </Column>
              <Column key={`match-col-1-${mail}`} width={8}>
                <h2>{`${other_user.first} ${other_user.last}`}</h2>
              </Column>
              <Column key={`match-col-2-${mail}-icons`}>
                <Icon  name={"talk"} size='big'/>
                <Icon  name={"send"} size='big'/>
              </Column>

            </Row>
 
          )
      }
    });
    return activeMatches;    
  }

  return(
    <Grid columns={3} >
      {mapMatchesToList()}
    </Grid>
  )

}

const smallPic = (addr) => {
  return[
    addr.slice(0,36),
    "thumb",
    addr.slice(36)
  ].join("");
}

const mapStateToProps = state =>
{
  return {matches: state.matches,currentUser: state.currentUser};
}

export default connect(mapStateToProps)(MatchListTab);