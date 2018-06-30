
import React, {Component} from 'react';
import BooksList from '../containers/booksList';
import Notes from '../containers/notes';
import Lable from '../../stories/lable/lable';
import Div from '../../stories/div/div';
import User from '../../stories/user/user';
import MarkDown from '../../markdown'

class Page extends Component{
  constructor(props) {
        super(props);
        this.state = {
          name: 'user_name',
        };
      }

    componentDidMount() {
      fetch('/userinfo')
        .then(res => res.json())
        .then((res)=>{
           this.state.name = res.name;
           this.setState(this.state)
         })
    }
render(){
  return(
    <div>
    <Div className="flex flex-right">
      <User>{this.state.name}</User>
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

export default Page;
