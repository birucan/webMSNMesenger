import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

import Login from './pages/Login.js';


class App extends Component {
  render() {


    return (

      <Router>



          <Route name="login" exact path="/" component={Login} />


      </Router>

    )
  }
}

export default App;
