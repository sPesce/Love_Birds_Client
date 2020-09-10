import React from 'react'
import {Image,Container} from 'semantic-ui-react'
import logoFull from  '../images/logoFull.png'

const Landing = (props) =>
{
  return(
    <div id='landing-container'>
      <div className='ui container' id='landing-content'>
        <Image src={logoFull} id="landing-logo"/>
      </div>
    </div>
  )
}

export default Landing;