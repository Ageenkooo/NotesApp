import React, { Component } from 'react';
import Lable from './stories/lable/lable';
import Form from './stories/form/form';
import Input from './stories/input/input';
import Button from './stories/button/button';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import $ from 'jquery';

window.jQuery = window.$ = $;

class Registration extends Component {
  static contextTypes = { router: React.PropTypes.object }
  constructor(props) {
        super(props);
        this.state = {
          name:'',
          email: '',
          password: '',
          confirmPass:'',
          linking : true,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }
      onSubmit = (e) => {
         e.preventDefault();
         if(this.state.password != '' && this.state.confirmPass != ''  && this.state.password == this.state.confirmPass){
           $.ajax({
                  type: 'post',
                  url: '/registration',
                  data: JSON.stringify({email: this.state.email, password: this.state.password, name: this.state.name,
                                        books: [{id : 1,
                                                book : "my first book",
                                                note : "one",
                                                selected: false,
                                                deleted:false}],
                                        notes: [{book_id:1,
                                                id:1,
                                                name : "1.1 note",
                                                text : "text1",
                                                selected: false,
                                                deleted: false,
                                                lables: []}]}),
                  dataType: "json",
                  contentType: "application/json",
                  success: (data)=>{
                    if(data == "ok")
                      this.context.router.history.push('/login');
                      },
                  });
         }
      }
      handleClick(e) {
        if(!this.state.linking)
          e.preventDefault();
      }
  render() {
    return (
      <Form className="center longer" onSubmit={this.onSubmit} action="/registration" method="post">
        <Lable className="center">Registration</Lable>
        <Lable className="center medium">Name : </Lable>
        <Input type="text" className="center" name="name" value={this.state.name} onChange={this.onChange}/>
        <Lable className="center medium">Your e-mail :</Lable>
        <Input type="text" className="center" name="email" value={this.state.email} onChange={this.onChange}/>
        <Lable  className="center medium">Password :</Lable>
        <Input type="password" className="center" name="password" value={this.state.password} onChange={this.onChange}/>
        <Lable  className="center medium">Confirm password :</Lable>
        <Input type="password" className="center" name="confirmPass" value={this.state.confirmPass} onChange={this.onChange}/>
        <Button className="center" type="submit" value="Yep">Yep</Button>
      </Form>
    );
  }
}

export default Registration;
