import React, { Component } from 'react';
import './Requests.css';
import {ButtonGroup, Button, Grid, Col, Collapse, Well, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap'
var validator = require('validator');

class Requests extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      open_p2: false,
      url: ""
    }
    this.getValidationState = this.getValidationState.bind(this)
    this.changeUrl = this.changeUrl.bind(this)
  }
  changeUrl(event){
    this.setState({url: event.target.value})
  }
  getValidationState(){
    if (validator.isURL(this.state.url)){
      return 'success'
    }
    return 'error'
  }
  render() {
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
      <Collapse in={this.state.open}>
      <div>
      <Well>
        Pancakes are good
      </Well>
      </div>
      </Collapse>
      <Collapse in={this.state.open_p2}>
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
            placeholder="Enter text"
            onChange={this.changeUrl}
          />
          <FormControl.Feedback />
          <HelpBlock>Must be a valid URL.</HelpBlock>
        </FormGroup>
      </form>
      </Well>
      </div>
      </Collapse>
      </div>
      </div>
    );
  }
}

export default Requests;
