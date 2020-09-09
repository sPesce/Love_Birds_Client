import React, {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SignupLogin from './containers/SignupLogin'
import Account from './containers/Dashboard'
import Dashboard from './containers/Dashboard'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import FindMatches from './containers/FindMatches'
import {connect} from 'react-redux'
import {URL} from './constants/URL'
import configObj from './helpers/configObj'

const App = (props) => {

  const [logged,setLogged] = useState(false)
  
  useEffect(() => {
    fetch(URL + "find_user/", configObj("GET",true))
    .then(r => r.json())
    .then(() => setLogged(true))
    .catch(() => setLogged(false))
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/find_matches'>
          <FindMatches/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route path='/'>
 0         <SignupLogin/>
        </Route>
      </Switch>
      {/* {!logged && <Redirect to="/"/>} */}
    </BrowserRouter>
  );
}

export default connect(state => {return {currentUser: state.currentUser}})(App);
