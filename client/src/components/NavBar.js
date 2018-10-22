import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NavBar extends Component {

  logout = (event) => {
    event.preventDefault();
    //console.log('logging out')
    axios.post('/api/user/logout').then((response) => {
      //console.log(response.data);
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          email: null
        })
        window.location = '/';
      }
    }).catch((error) => {
      console.log('Logout error ', error);
    })
  }

  render () {
    const { loggedIn } = this.props.state;
    //console.log('navbar render, props: ', this.props)

    return (
      <nav>
        <Link to='/'>Home</Link>
        {loggedIn ? (
          <>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/surgeries'>Surgeries</Link>
          <Link to='#' onClick={this.logout}>Logout</Link>
          </>
        ) : (
          <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Login</Link>
          </>
        )}
      </nav>
    )
  }
}

export default NavBar;