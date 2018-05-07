import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const API_URL = "https://sdlfnq0v8c.execute-api.us-east-1.amazonaws.com/v1/upload-file";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadFilePath: null,
      isUploading: false
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles) {
    console.log('hey', acceptedFiles);
    acceptedFiles.forEach(file => {
      this.convertFileToBase64(file).then(file64 => {
        const base64String = file64.substring(file64.indexOf(",") + 1);
        const params = {
          base64String
        }

        let st = this.state;
        st.isUploading = true;
        this.setState(st);

        axios.post(API_URL, params).then(res => {
          console.log(res);
          this.setState({
            isUploading: false,
            uploadFilePath : res.data.body.full_path
          })
        });
      });
    });
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

    const loadingResult = this.state.isUploading ? <span>Uploading...</span> : null;

    return (
      <div className="App">
          <h1>File Upload Page with Lambda + S3 + API Gateway</h1>
          <center style={{ align: "center" }}>
            <Dropzone className="inputdrop" onDrop={this.onDrop} multiple={false}>
              <p>Try dropping a file here, or click to select file to upload.</p>
            </Dropzone>
          </center>
          <br />
          {loadingResult}
          {result}
      </div>
    );
  }
}

export default App;
