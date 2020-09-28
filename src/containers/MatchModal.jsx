import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {SEND_MATCH} from '../constants/URL'
import configObj from '../helpers/configObj'

const MatchModal = (props) => 
{
  const user = {
    zip_code: props.currentUser.zip_code,
    interests: [...props.interests],
    disabilities: [...props.disabilities]
  }

  const {open,setOpen,matches} = props
  const [current,setCurrent] = useState(0)

  
  const matched = {
    zip_code: props.matches[current].zip_code,
    interests: [...mapName(props.matches[current].interests)],
    disabilities: [...mapName(props.matches[current].disabilities)]
  }

  const matchHandler = () =>
  {
    fetch(SEND_MATCH,configObj("POST",true,{user:{email: props.matches[current].email}}))
    .then(r => r.json())
    .then(() => props.remove(current))
  }

  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={open}
      trigger={<Button>Open Matches Browser</Button>}
    >
      <Modal.Header>{matches[current].first} </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={matches[current].pic} wrapped />
        <Modal.Description>
          <Header>{inCommon(user,matched)}</Header>
          <p>
            {matches[current].bio}
          </p>
          <p>{matches[current].email}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Hide
        </Button>
        <Button
          content="Like"
          labelPosition='right'
          icon='checkmark'
          onClick={() => matchHandler()}
          positive
        />
        {matches[current - 1] && <Button onClick={() => setCurrent(current -1 )}>previous</Button>}
        {matches[current + 1] && <Button onClick={() => setCurrent(current + 1)}>Next</Button>}
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state =>
{
  return {
    currentUser: state.currentUser,
    interests: state.interests,
    disabilities: state.disabilities
  }
}

export default connect(mapStateToProps)(MatchModal)

const mapName = (array) =>
{
  return array.map(e => e.name)
}

const shareInterest = (arr1,arr2) =>
{
  return arr1.some(item => arr2.includes(item)) ? "Interest" : ""
}

const shareDisability = (arr1,arr2) =>
{
  return arr1.some(item => arr2.includes(item)) ? "Disability" : ""
}

const shareZip = (zip1,zip2) =>
{
  return zip1 === zip2 ? "Zip-Code" : ""
}

const inCommon = (current,match) =>
{
  let matchThese = []
  const interest = shareInterest(current.interests,match.interests)
  const zip = shareZip(current.zip_code,match.zip_code)
  const disability = shareDisability(current.disabilities,match.disabilities)

  let one = false;
  let returnString = ""
  if(interest !== "" || zip !== "" || disability !== "")
  {
    [interest,zip,disability].forEach(el => {
      if(el !== "")
      {
        returnString += !one ? `You share: ${el}` : ` | ${el}`
        one = true;
      }
    })

  }
  return returnString;
} 