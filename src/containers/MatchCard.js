import React from 'react'
import {Card,Grid,Button,Icon,Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'
import configObj from '../helpers/configObj'
import {SEND_MATCH} from '../constants/URL'

const MatchCard = ({match,interests,currentUser,disabilities,remove,matchId}) =>
{
  const sharesInterests = () =>
  {
    let share = {
      disabilities: false,
      interests: false,
      location: match.zip_code === currentUser.zip_code
    }
    interests.forEach(Icurrent => {
      match.interests.forEach(Imatch => {
        if(Imatch === Icurrent)
          share.interests = true;
      });
    });
    disabilities.forEach(Dcurrent => {
      match.disabilities.forEach(Dmatch => {
        if(Dmatch === Dcurrent)
          share.disabilities = true;
      });
    });

    const header = []
    let any = false;
    if(share.disabilities)
    {
      header.push("a disability");
      any = true;
    }
    if(share.interests)
    {
      header.push("an interest");
      any = true;
    }
    if(share.location)
    {
      header.push("a zip code");
      any = true;
    }
    if(any)
    return any ? ("Share: " + header.join(" | ")) : ""  
  }

  const matchHandler = () =>
  {
    fetch(SEND_MATCH,configObj("POST",true,{user:{email: match.email}}))
    .then(r => r.json())
    .then(() => remove(matchId))
  }
  
  return <Card>
      <Image src={match.pic} wrapped ui={false}/>
      <Card.Content header={fullName(match.first,match.last)}/>
      <Card.Content meta={sharesInterests()} />
      <Card.Content description={match.bio} />
      <Card.Content extra>
        <Grid columns={2}>
          <Grid.Column >
            <Button circular icon='heart' onClick={() => matchHandler()}></Button>
          </Grid.Column>
          <Grid.Column >
            <Button circular >X</Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
      
    </Card>
}

const fullName = (first,last) =>
{
  return(
    first[0].toUpperCase() 
    + first.slice(1)
    + " "
    + last[0].toUpperCase()
    + last.slice(1)
  )
}

const mapStateToProps = (state) =>
{
  return{
    currentUser: state.currentUser,
    interests: state.interests,
    disabilities: state.disabilities
  }
}

export default connect(mapStateToProps)(MatchCard);