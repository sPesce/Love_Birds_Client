import React from 'react'
import {Grid} from 'semantic-ui-react'

const AccountDetailsRow = (props) =>
{  
    const [label,content] = props.field
    return(
      <> 
        <Grid.Row>
          <Grid.Column>
            <h4><strong>{label}:</strong></h4>
          </Grid.Column>      
          <Grid.Column >
            <h5><i>{content}</i></h5>
          </Grid.Column>
        </Grid.Row>
      </>
     ) 
}

export default AccountDetailsRow;