import React, { Component } from 'react';
import Lable from './stories/lable/lable';
import Form from './stories/form/form';
import Input from './stories/input/input';
import Button from './stories/button/button';
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
class Main extends Component {
  render() {
    return (
      <Form className="center shorter">
        <Lable className="center">Hello, it is Notes App</Lable>
        <Lable className="center">Start Now !</Lable>
        <br/>
        <Link exact to="/registration"><Button>Registrate</Button></Link>
        <Link exact to="/login"><Button>LogIn</Button></Link>
      </Form>
    );
  }
}

export default Main;
