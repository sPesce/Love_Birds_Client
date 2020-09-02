import React from 'react'
import {Grid} from 'semantic-ui-react'

const AccountDetailsRow = (props) =>
{
  const [key,value] = props.field
  return( 
    <Grid.Row>
      <Grid.Column width={3}>
        <h4><strong>{key}</strong></h4>
      </Grid.Column>
      <Grid.Column width={11}>
        <h4>{value}</h4>
      </Grid.Column>
    </Grid.Row>   
   )
}

export default AccountDetailsRow;