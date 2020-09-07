import React, {useState,useEffect} from 'react'
import {FIND_MATCHES} from '../constants/URL'
import configObj from '../helpers/configObj'
import DistanceForm from '../components/DistanceForm'
import { Container } from 'semantic-ui-react'
import MatchCards from './MatchCards'

const FindMatches = props =>
{

  const [matches,setMatches] = useState([])
  const [distance,setDistance] = useState("")

  const setAndFetch = (e,{value}) =>
  {
    console.log(`Finding matches within ${value && value} miles...`)
    setDistance(value)
    fetch(FIND_MATCHES,configObj("POST",true,value && {radius: parseInt(value)}))
    .then(r => r.json())
    .then(matches => setMatches(matches))
  }
  

  return <Container>
    <DistanceForm distance={distance} onChange={setAndFetch} />
    <MatchCards matches={matches} />
  </Container>
}

export default FindMatches;