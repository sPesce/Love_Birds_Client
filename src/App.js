import React, {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SignupLogin from './containers/SignupLogin'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Account from './containers/Dashboard'
import Dashboard from './containers/Dashboard'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import FindMatches from './containers/FindMatches'
import {connect} from 'react-redux'
import {URL} from './constants/URL'
import configObj from './helpers/configObj'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import Footer from './components/Footer'


const App = (props) => {

  const [logged,setLogged] = useState(false)
  
  useEffect(() => {
    fetch(URL + "find_user/", configObj("GET",true))
    .then(r => r.json())
    .then((data) => setLogged(true))
    .catch(() => setLogged(false))
  }, []);

  return (
    
    <BrowserRouter>
    <NavBar logged={logged} setLogged={setLogged}/>
      <Switch>
        <Route path='/find_matches'>
          <FindMatches/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard/>
        </Route>
        <Route path='/login'>
          <SignupLogin content={<LoginForm/>}/>
        </Route>
        <Route path='/signup'>
          <SignupLogin content={<SignupForm/>} />
        </Route>
        <Route path='/'>
          <Landing/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default connect(state => {return {currentUser: state.currentUser}})(App);
