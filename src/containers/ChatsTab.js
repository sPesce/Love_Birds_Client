import React from 'react'
import  {
  Container,
  Grid,Message,
  GridColumn,
  Form,
  TextArea,
  Button,
  Icon,
  Segment
} from 'semantic-ui-react'
import {connect} from 'react-redux'

import ChatModal from '../components/ChatModal'

const ChatsTab = (props) =>
{
  const generateNameList = () =>
  {
    return props.matches.map(match => {
    return <li>{match.sender_name} {match.sender_last}</li>
    })
  }

  return <Grid columns={2} id='chat-page'>
          <Grid.Column width={5}>
           <ul>
              {generateNameList()}
          </ul>
        </Grid.Column>
        <GridColumn >
          <div id='chat-div' className="chat">
            <Segment className="chat" id='chat-content'></Segment>
            <Form className="chat" id='chat-input'>
              <TextArea className='chat' id='chat-input-field' ></TextArea>
              <Button submit id='submit-chat'>
                <Icon name="paper plane"></Icon>
              </Button>
            </Form>
            
          </div>
        </GridColumn>
    </Grid>
}

const mapStateToProps = (state) =>
{
  return{
    currentUser: state.currentUser,
    matches: state.matches
  }
}

export default connect(mapStateToProps)(ChatsTab);