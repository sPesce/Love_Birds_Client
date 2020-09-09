import React from 'react'
import {Card} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'

const MatchCard = ({match,interests,currentUser,disabilities}) =>
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
  
  return <Card
  image={match.pic}
  header={fullName(match.first,match.last)}
  meta={sharesInterests()}
  description={match.bio}
/>
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