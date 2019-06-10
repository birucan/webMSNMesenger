import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
state = {
  userTC: null,
  body: null,
  data:null
}

componentDidMount() {
  this.getDataFromDb();
  if (!this.state.intervalIsSet) {
    let interval = setInterval(this.getDataFromDb, 1000);
    this.setState({ intervalIsSet: interval });
  }
}

never let a process live forever
always kill a process everytime we are done using it
componentWillUnmount() {
  if (this.state.intervalIsSet) {
    clearInterval(this.state.intervalIsSet);
    this.setState({ intervalIsSet: null });
  }
}

getDataFromDb = () => {
   fetch('http://localhost:3001/api/getData')
     .then((data) => data.json())
     .then((res) => this.setState({ data: res.data }));
};

  render() {
    const { isAuthenticated, login, getExpiryDate } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() &&
          <div>
            <h4>You are logged in!</h4>
            <h3>Your chats</h3>
            state.
          </div>
          }
        {!isAuthenticated() &&
          <h4>
            You are not logged in! Please{' '}
            <a style={{ cursor: 'pointer' }} onClick={login.bind(this)}>
              Log In
            </a>{' '}
            to continue.
          </h4>}
      </div>
    );
  }
}

export default Home;
