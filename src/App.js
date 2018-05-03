import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div className="App">
          <input type="file" name="foo" onChange={this.fileSelectedHandler}/>
      </div>
    );
  }

  fileSelectedHandler(e) {
    console.log(e.target.files[0]);
    const fd = new FormData();
    fd.append('foo', e.target.files[0], e.target.files[0].name);
    console.log(fd);
    
    // const instance = axios.create({
    //   baseURL: 'http://localhost:3000'
    // });
    // instance.post('/', fd).then(res => console.log('done'));

    axios.post('http://localhost:3000', fd).then(res => console.log(res));
  }
}

export default App;
