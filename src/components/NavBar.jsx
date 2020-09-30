import React, { useState} from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import logoPic from '../images/logoPic.png'
import {Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {userLogout} from '../actions/currentUser'

//-------------------------------------------------------=
//Purpose: Top of site nav bar
//-------------------------------------------------------=


const NavBar = ({setLogged,userLogout,logged}) => {
  console.log(logged);
  
  const [activeItem,setActiveItem] = useState('');
  
    
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
      }
      
      const logout = () => {
        localStorage.clear();
        userLogout();
        setLogged(false);
      }
      
      
        
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
              onClick={handleItemClick}
          />          
        { localStorage.token && logged &&
        [
          <Menu.Item
              as={Link}
              to='/dashboard/'
              name='DASHBOARD'
              active={activeItem === 'Dashboard'}
              onClick={handleItemClick}
          />,
          <Menu.Item
              as={Link}
              to='/find_matches'
              name='FIND MATCHES'
              active={activeItem === 'Find Matches'}
              onClick={handleItemClick}
          />,
          <Menu.Item
            as={Link}
            to='/' 
            className="logout-bttn"
            name='LOGOUT'
            active={activeItem === 'logout'}
            onClick={logout}
        />
        ]}
        {(!localStorage.token || !logged) &&
        [            
          <Menu.Item
              as={Link}
              to="/signup"
              name='SIGNUP'
              active={activeItem === 'signup'}
              onClick={handleItemClick}
          />,
          
          <Menu.Item
              as={Link}
              to="/login"
              name='LOGIN'
              active={activeItem === 'login'}
              onClick={handleItemClick}
          />
        ]
      }
      
              
      </Menu>
      )    
}

export default connect(null,{userLogout})(NavBar);
