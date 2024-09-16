import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import LogInForm from './Components/LogInForm';
import SignUpForm from './Components/SignUpForm';
import Jokes from './Components/Jokes';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={SignUpForm} />
      <Route exact path='/login' component={LogInForm} />
      <Route exact path='/jokes' component={Jokes} />
    </div>
  );
}

export default App;
