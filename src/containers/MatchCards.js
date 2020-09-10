import React from 'react'
import MatchCard from '../containers/MatchCard'

const MatchCards = ({matches,remove}) =>
{
  const renderCards = () =>
  {
    if(matches && matches[0] && matches[0].first)
    {
      return matches.map((match,i) => {
        return <MatchCard key={`user-card-${i}`} match={match} matchId={i} remove={remove}></MatchCard>
      })
    }
    else
      return <><br/><br/><h2>Sorry, no matches were found in your area.</h2></>
  }

  if (matches[0])
    return <div id="match-cards-main"> {renderCards()} </div>
  else
    return <div></div>
}

export default MatchCards;