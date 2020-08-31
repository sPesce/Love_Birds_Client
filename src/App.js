import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './containers/Signup'
import Account from './containers/Dashboard'
import Dashboard from './containers/Dashboard'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
