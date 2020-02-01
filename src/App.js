import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/view" exact component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default App;
