
import React, {Component} from 'react';
import BooksList from '../containers/booksList';
import Notes from '../containers/notes';
import Lable from '../../stories/lable/lable';
import Div from '../../stories/div/div';
import User from '../../stories/user/user';
import {withRouter} from "react-router-dom";
import MarkDown from '../../markdown'
import $ from 'jquery';
window.jQuery = window.$ = $;


class Page extends Component{
  constructor(props) {
        super(props);
        this.state = {
          name: 'user_name',
          email: '',
        };
        this.Logout = this.Logout.bind(this);
      }

    componentDidMount() {
      fetch('/userinfo')
        .then(res => res.json())
        .then((res)=>{
           this.state.name = res.name;
           this.state.email = res.emai;
           this.setState(this.state)
         })
    }
    Logout() {
      $.ajax({
          type: 'post',
          url: '/users/logout',
          data: JSON.stringify({email: this.state.email}),
          dataType: "json",
          contentType: "application/json",
          success: (data) => {
                  this
                      .props
                      .history
                      .push('/registration');
              
          }
      });
  }
render(){
  return(
    <div>
    <Div className="flex flex-right">
      <User>{this.state.name}</User>
      <button onClick={this.Logout}>logout</button>
    </Div>
    <hr/>
    <Div className="flex center flex-left white height">
      <Div className="left">
        <Lable>Your books</Lable>
        <BooksList/>
      </Div>
      <Div className="middle">
        <Lable>Your notes</Lable>
        <Notes/>
      </Div>
      <Div className="right ">
          <MarkDown/>
      </Div>
    </Div>
    </div>
  )
}

};

export default withRouter(Page);
