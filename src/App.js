import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './containers/Signup'
import Account from './containers/Dashboard'
import Dashboard from './containers/Dashboard'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import FindMatches from './containers/FindMatches'

function App() {
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
 0         <Signup/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
