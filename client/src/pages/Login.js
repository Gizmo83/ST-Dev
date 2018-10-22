import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectTo: null
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.email, ' signed up')

    // request to server
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      console.log('login response: ')
      console.log(response)
      if (response.status === 200) {
        // update App.js state
        this.props.updateUser({
          loggedIn: true,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName
        })
        // update the state to redirect to dashboard
        this.setState({
          redirectTo: '/dashboard'
        })
      }
    }).catch(error => {
      console.log('login error: ', error)
    })
  }

  render () {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <p>Login Page</p>
          <form>
            <input
              type='text'
              placeholder='E-mail'
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <input
              type='password'
              placeholder='Password'
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <button type="submit" onClick={this.handleSubmit}>Sign Up</button>
          </form>
          <Link to='password_reset'>Reset Password</Link>
        </div>
      )
    }
  }
}

export default Login;