import React, { Component } from 'react';

class Dashboard extends Component {
  
  render () {
    if (!this.props.state.loggedIn) {
      return (
        <div>
          <p>Dashboard Page</p>
          <p>Please Log In</p>
        </div>
      )
    }
    return (
      <div>
        <p>Dashboard Page</p>
        <p>Hi {this.props.state.firstName}</p>
      </div>
    )
  }
}

export default Dashboard;