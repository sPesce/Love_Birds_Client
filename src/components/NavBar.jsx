import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import logoPic from '../images/logoPic.png'
import {Image} from 'semantic-ui-react'

//-------------------------------------------------------=
//Purpose: Top of site nav bar
//-------------------------------------------------------=


export default class NavBar extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      activeItem: ''
    }
    }
    
    handleItemClick = (e, { name }) => {
        this.setState({
          activeItem: name
        })
      }
      
      logout = () => {
        localStorage.clear()
        this.props.setLogged(false)
      }
      
      render() {
        const { activeItem } = this.state
        return (
          <Menu inverted id='nav-main'>
          <Menu.Item header>
            <Image src={logoPic} size='mini' id='nav-logo'/>
          </Menu.Item>
          
          <Menu.Item
                as={Link}
                to='/'
                name='HOME'
                active={activeItem === 'Home'}
                onClick={this.handleItemClick}
            />          
          { !this.props.logged &&
          [
            <Menu.Item
                as={Link}
                to='/dashboard'
                name='DASHBOARD'
                active={activeItem === 'Dashboard'}
                onClick={this.handleItemClick}
            />,
            <Menu.Item
                as={Link}
                to='/find_matches'
                name='FIND MATCHES'
                active={activeItem === 'Find Matches'}
                onClick={this.handleItemClick}
            />,
            <Menu.Item
              className="logout-bttn"
              name='LOGOUT'
              active={activeItem === 'logout'}
              onClick={this.logout}
          />
          ]}
          {this.props.logged && 
          [            
            <Menu.Item
                as={Link}
                to="/signup"
                name='SIGNUP'
                active={activeItem === 'signup'}
                onClick={this.handleItemClick}
            />,
            
            <Menu.Item
                as={Link}
                to="/login"
                name='LOGIN'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
            />
          ]
        }
        
                
        </Menu>
        )
    }
}
