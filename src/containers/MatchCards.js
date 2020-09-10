import React from 'react'
import MatchCard from '../containers/MatchCard'

const MatchCards = ({matches,remove}) =>
{
  const renderCards = () =>
  {
    if(matches)
    {
      return matches.map((match,i) => {
        return <MatchCard key={`user-card-${i}`} match={match} matchId={i} remove={remove}></MatchCard>
      })
    }
  }

  if (matches)
    return <div> {renderCards()} </div>
  else
    return <div></div>
}

export default MatchCards;