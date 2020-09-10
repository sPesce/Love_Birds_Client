import React, {useState,useEffect} from 'react'
import {FIND_MATCHES} from '../constants/URL'
import configObj from '../helpers/configObj'
import DistanceForm from '../components/DistanceForm'
import { Container } from 'semantic-ui-react'
import MatchCards from './MatchCards'
import {URL,DISABILITIES_URL} from '../constants/URL'
import {connect} from 'react-redux'
import {setCurrentUser} from '../actions/currentUser'
import {setDisabilities} from '../actions/disabilities'
import {setInterests} from '../actions/interests'
import {setMatches} from '../actions/matches'

const FindMatches = props =>
{
  //non accepted matches, only list of users
  const [matches,setMatches] = useState([])
  const [distance,setDistance] = useState("")

  const removeMatch = (id) =>
  {
    console.log('removing ',id)
    setMatches(
      matches.filter((match,i) => id !== i)
    )
  }

  const setAndFetch = (e,{value}) =>
  {
    console.log(`Finding matches within ${value && value} miles...`)
    setDistance(value)
    fetch(FIND_MATCHES,configObj("POST",true,value && {radius: parseInt(value)}))
    .then(r => r.json())
    .then(matches => {
      setMatches(matches)
      console.log(matches)
    }
      )
  }
  

  return <Container>
    <DistanceForm distance={distance} onChange={setAndFetch} />
    {matches[0] && <MatchCards matches={matches} remove={removeMatch} distance={distance}/>}
    {!matches[0] && distance && <><br/><br/><h2>Sorry, not matches in your area.</h2></> }
  </Container>
}

export default connect(null,{setMatches,setCurrentUser,setDisabilities,setInterests})(FindMatches);