import React from 'react'
import MatchCard from '../containers/MatchCard'

const MatchCards = ({matches}) =>
{
  const renderCards = () =>
  {
    let i = 0;
    return matches.map(match => <MatchCard key={`user-card-${i++}`} match={match}/>)
  }

  return <div> {renderCards()} </div>
}

export default MatchCards;