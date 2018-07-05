
import React, {Component} from 'react';
import BooksList from '../containers/booksList';
import Notes from '../containers/notes';
import Lable from '../../stories/lable/lable';
import ButtonS from '../../stories/button/button';
import Div from '../../stories/div/div';
import User from '../../stories/user/user';
import { Button, Popup , Modal} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";
import MarkDown from '../../markdown'
import $ from 'jquery';
window.jQuery = window.$ = $;

const inlineStyle = {
	modal : {
	  marginTop: '0px !important',
	  marginLeft: 'auto',
	  marginRight: 'auto',
	}
};
class Page extends Component{
  constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
        };
        this.Logout = this.Logout.bind(this);
      }

    componentDidMount() {
      fetch('/userinfo')
        .then(res => res.json())
        .then((res)=>{
           this.state.name = res.name;
           this.state.email = res.email;
           this.setState(this.state)
         })
        //  .catch((err)=>{
        //    this
        //   .props
        //   .history
        //   .push('/login');})
    }
    Logout() {
      $.ajax({
          type: 'post',
          url: '/users/logout',
          data: JSON.stringify({email: this.state.email}),
          dataType: "json",
          contentType: "application/json",
          success: (data) => {
            console.log(data)
            if(data == "logout")
                  this
                      .props
                      .history
                      .push('/login');
              
          }
      });
      
  }
render(){
  return(
    <div>
    <Div className="flex flex-right">
      <Popup
            trigger={<User>{this.state.name}</User>}
            content={<div>
              <p> Name: {this.state.name}</p>
               <p>E-mail: {this.state.email} </p>
               <Modal 
											style={inlineStyle.modal}
    										trigger={<ButtonS >logout</ButtonS>}
    										header='Logout?'
    										content='Do you really want to exit?'
    										actions={['May be later', { key: 'Yesss', content: 'Yesss', positive: true,onClick:() =>{ this.Logout();}  }]}/>        									
						
                
                </div>}
            on='click'
            position='top right'
      />
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
