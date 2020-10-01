import React from 'react';
import {connect} from 'react-redux';

const MatchListTab = ({matches}) =>
{
  const isActive = (match) =>
  {
    return (match.sender_status === 2 && match.reciever_status === 2)
  }
  
  const activeMatches = !matches[0] ? null : matches.filter( match => isActive(match));
  return(
    <ul>

    </ul>
  )

}

const mapStateToProps = state =>
{
  return {matches: state.matches}
}

export default connect(mapStateToProps)(MatchListTab);