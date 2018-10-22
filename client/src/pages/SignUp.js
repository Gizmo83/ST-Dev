import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
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

    // request to server
    axios.post('/signup', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      console.log(response)
      if (!response.data.errors) {
        console.log('successful sign up')

        // After successful sign up send to login route to log user in.
        axios.post('/login', {
          email: this.state.email,
          password: this.state.password
        }).then((response) => {
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
      } else {
        console.log('sign up error')
      }
    }).catch(error => {
      console.log('sign up server error: ', error)
    })
  }

  render () {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
          <p>This is the SignUp Page.</p>
          <form>
            <input
              type='text'
              placeholder='First Name'
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <br />
            <input
              type='text'
              placeholder='Last Name'
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <br />
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
        </div>
      )
    }
  }
}

export default SignUp;