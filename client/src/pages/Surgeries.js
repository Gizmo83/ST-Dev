import React, { Component } from 'react';

class Surgeries extends Component {
  
  render () {
    if (!this.props.state.loggedIn) {
      return (
        <div>
          <p>Surgeries Page</p>
          <p>Please Log In</p>
        </div>
      )
    }
    return (
      <div>
        <p>Surgeries Page</p>
        <p>Hi {this.props.state.firstName}</p>
      </div>
    )
  }
}

export default Surgeries;