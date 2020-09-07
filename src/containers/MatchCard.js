import React from 'react'
import {Card} from 'semantic-ui-react'

const MatchCard = ({match}) =>
{
  
  return <Card
  image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
  header={`${match.first} ${match.last[0]}.`}
  meta='Friend'
  description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
/>
}

export default MatchCard;