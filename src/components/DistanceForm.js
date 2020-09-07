import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const distanceOptions = [
  {
    key: 'Any',
    text: 'any',
    value: null
  },
  {
    key: '5 miles',
    text: '5 miles',
    value: '5'
  },
  {
    key: '10 miles',
    text: '10 miles',
    value: '10'
  },
  {
    key: '15 miles',
    text: '15 miles',
    value: '15'
  },
  {
    key: '20 miles',
    text: '20 miles',
    value: '20'
  },
  {
    key: '50 miles',
    text: '50 miles',
    value: '50'
  },
  
]

const DistanceForm = ({distance,onChange}) => (
  <Dropdown
    placeholder="Set a maximum radius from you to match"
    value={distance}
    fluid
    selection
    options={distanceOptions}
    onChange={onChange}
  />
)

export default DistanceForm;