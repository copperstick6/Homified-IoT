import React, { Component } from 'react';
import './Requests.css';
import {ButtonGroup, Button, Grid, Col, Fade, Well, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'
var validator = require('validator');
var BASE_REQUEST = "http://localhost:5000/"
var request = require("request");

class Requests extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      open_p2: false,
      url: "http://",
      url_2: "http://",
      json: "",
      urlvalid: false,
      url2valid: false,
      jsonvalid: false,
    }
    this.getValidationState = this.getValidationState.bind(this)
    this.getJsonValidationState = this.getJsonValidationState.bind(this)
    this.changeUrl = this.changeUrl.bind(this)
    this.submit_get = this.submit_get.bind(this)
    this.submit_post = this.submit_post.bind(this)
    this.changePayload = this.changePayload.bind(this)
    this.changeUrl2 = this.changeUrl2.bind(this)
    this.getValidationState2 = this.getValidationState2.bind(this)
  }
  submit_get(event){
    event.preventDefault()
    request.post(BASE_REQUEST + "addNewGet").form({link: this.state.url})

  }
  submit_post(event){
    event.preventDefault()
    if(this.state.json == null || this.state.json == null || this.state.json == ""){
      request.post(BASE_REQUEST + "addNewPost").form({link: this.state.url2})
    }
    else{
      request.post(BASE_REQUEST + "addNewPost").form({link: this.state.url2, payload: this.state.json})
    }

  }
  changeUrl(event){
    this.setState({url: event.target.value, urlvalid: false})
  }
  changeUrl2(event){
    this.setState({url_2: event.target.value, url2valid: false})
  }
  changePayload(event){
    this.setState({json: event.target.value, jsonvalid: false})
  }
  getJsonValidationState(){
    if (validator.isJSON(this.state.json) || this.state.json == null || this.state.json == undefined || this.state.json == ""){
      return 'success'
    }
    return 'error'
  }
  getValidationState2(){
    if (validator.isURL(this.state.url_2) && (this.state.url_2.includes("http://") || this.state.url_2.includes("https://"))){
      return 'success'
    }
    return 'error'
  }
  getValidationState(){
    if (validator.isURL(this.state.url) && (this.state.url.includes("http://") || this.state.url.includes("https://"))){
      return 'success'
    }
    return 'error'
  }

  render() {
    let p1 = null
    let p2 = null
    let cur_but_state = !(validator.isURL(this.state.url) && (this.state.url.includes("http://") || this.state.url.includes("https://")))
    let cur_but_state_2 = !((validator.isURL(this.state.url_2) && (this.state.url_2.includes("http://") || this.state.url_2.includes("https://"))) && (validator.isJSON(this.state.json) || this.state.json == null || this.state.json == undefined || this.state.json == ""))
    if(this.state.open){
      p1 = <Fade in={this.state.open}>
      <div>
      <Well>
        <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <p>Enter URL here</p>
          <FormControl
            type="text"
            value={this.state.url}
            placeholder="Enter URL here"
            onChange={this.changeUrl}
          />
          <FormControl.Feedback />
          <HelpBlock>Must be a valid URL.</HelpBlock>
          <Button type="submit" onClick = {this.submit_get} disabled={cur_but_state}>Submit</Button>
        </FormGroup>
      </form>
      </Well>
      </div>
      </Fade>
    }
    else{
      p1 = null
    }
    if(this.state.open_p2){
      p2 = <Fade in={this.state.open_p2}>
      <div>
      <Well>
        <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState2()}
        >
          <p>Enter URL here</p>
          <FormControl
            type="text"
            value={this.state.url_2}
            placeholder="Enter URL here"
            onChange={this.changeUrl2}
          />
          <FormControl.Feedback />
          <HelpBlock>Must be a valid URL.</HelpBlock>
        </FormGroup>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getJsonValidationState()}
        >
          <p>Enter JSON Payload here</p>
          <FormControl
            type="text"
            value={this.state.json}
            placeholder="Enter JSON payload here"
            onChange={this.changePayload}
          />
          <FormControl.Feedback />
          <HelpBlock>Must be a valid JSON object.</HelpBlock>
          <Button type="submit" onClick = {this.submit_post} disabled={cur_but_state_2}>Submit</Button>
        </FormGroup>

      </form>
      </Well>
      </div>
      </Fade>
    }
    else{
      p2 = null
    }
    return (
      <div>

      <div className="bg_main">
      <h1>Add a request</h1>
      <p>Add a request here. GET/POST requests supported. More features will be supported soon for requests</p>
      <br />
      <ButtonGroup block justified>
      <Button bsStyle="success" onClick ={() => this.setState({open: !this.state.open, open_p2: false})} href="#" >Add GET request</Button>
      <Button bsStyle="danger" href="#" onClick={() => this.setState({open:false, open_p2: !this.state.open_p2})}>Add POST request</Button>
      </ButtonGroup>
      <br />
      {p1}
      {p2}
      </div>
      </div>
    );
  }
}

export default Requests;
