import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_URL = "https://sdlfnq0v8c.execute-api.us-east-1.amazonaws.com/v1/upload-file";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadFilePath: null
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  render() {
    const result = this.state.uploadFilePath ? <a href={this.state.uploadFilePath}>{this.state.uploadFilePath}</a> : null;

    return (
      <div className="App">
          <h1>File Upload Page with Lambda + S3 + API Gateway</h1>
          <input type="file" name="foo" onChange={this.fileSelectedHandler}/>
          <br />
          {result}
      </div>
    );
  }

  fileSelectedHandler(e) {

    const file = e.target.files[0];
    console.log(file);

    this.convertFileToBase64(file).then(file64 => {
      const base64String = file64.substring(file64.indexOf(",") + 1);
      const params = {
        base64String
      }
      axios.post(API_URL, params).then(res => {
        console.log(res);
        this.setState({uploadFilePath : res.data.body.full_path})
      });
    })
  }
}

export default App;
