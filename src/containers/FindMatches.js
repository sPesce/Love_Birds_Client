import React, {useState,useEffect} from 'react'
import {FIND_MATCHES} from '../constants/URL'
import configObj from '../helpers/configObj'
import DistanceForm from '../components/DistanceForm'

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
    .then(console.log)
  }
  

  return <DistanceForm distance={distance} onChange={setAndFetch} />
}

export default FindMatches;