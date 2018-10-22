import React, { Component } from 'react';
import axios from 'axios';

class PasswordReset extends Component {
  state = {
    email: ''
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();


  }

  render() {
    return (
      <div>
        <p>Reset your password</p>
        <form>
        <input
          type='text'
          placeholder='E-mail'
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit" onClick={this.handleSubmit}>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default PasswordReset;