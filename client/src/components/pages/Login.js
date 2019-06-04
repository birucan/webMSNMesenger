// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import tempPP from '../../assets/tempPPwBG.png'

class App extends Component {

  // initialize our state
  state = {
    email: null,
    password: null,
    passwordH: null,
  };



  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI


  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  hashPass = (pass) => {
      var md5 = require('md5');
      return md5(pass);
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div style={{padding: '10px'}}>


        <div style={{ padding: '30px' ,display: 'flex',  justifyContent:'center', alignItems:'center'}}>

          <img src={tempPP} alt="Logo" />
        </div>

        <div style={{ padding: '10px' ,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <input
            type="text"
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="example555@hotmail.com"
            style={{ width: '300px'  }}
          />

        </div>

        <div style={{ padding: '10px' ,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <input
            type="password"
            style={{ width: '300px' }}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Password"
          />

        </div>

        <div style={{ padding: '10px' ,display: 'flex',  justifyContent:'center', alignItems:'center'}}>

          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            Sign In
          </button>
        </div>

      </div>
    );
  }
}

export default App;
