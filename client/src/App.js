import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Components
import NavBar from './components/NavBar';

// Pages
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Surgeries from './pages/Surgeries';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';


class App extends Component {
  state = {
    loggedIn: false,
    email: null,
    firstName: null,
    lastName: null
  }

  componentDidMount = () => {
    this.getUser();
  }

  // Updating state from Login.js
  updateUser = (userObject) => {
    this.setState(userObject)
  }

  // Checks if user is logged in and updates state.
  getUser = () => {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)

      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName
        })
      } else {
        console.log('Get user: no user')
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <NavBar
            updateUser={this.updateUser}
            state={this.state}
          />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route
              exact path='/dashboard'
              render={() =>
              <Dashboard
                state={this.state}
              />}
            />
            <Route
              exact path='/surgeries'
              render={() =>
                <Surgeries
                  state={this.state}
                />}
            />
            <Route
              exact path='/signup'
              render={() =>
                <SignUp
                  updateUser={this.updateUser}
                />
              }
            />
            <Route
              exact path='/login'
              render={() =>
              <Login
                updateUser={this.updateUser}
              />}
            />
            <Route
              exact path='/password_reset'
              component={PasswordReset}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
