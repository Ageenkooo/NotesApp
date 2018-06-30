import {combineReducers} from 'redux';
import {ActiveBook, Actions} from './book-active';
import {Notes, ActiveNote} from './book';
import {Lables} from './lables'


const allReducers = combineReducers({
    books : Actions,
    active: ActiveBook,
    actions : Actions,
    notes: Notes,
    actNote : ActiveNote,
    lables: Lables
});

export default allReducers;
//
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import Item from './stories/item/item'
// import Input from './stories/input/input'
// import Button from './stories/button/button'
// import * as BookActions from './js/actions';
// import PropTypes from 'prop-types'
// import $ from 'jquery';
// import {bindActionCreators} from 'redux';
// window.jQuery = window.$ = $;
//
//
// var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
//
// class MarkDown extends React.Component{
//   state = {
//     text: this.props.text || '',
//     id: 0,
//   }
//
//   static propTypes = {
//     text: PropTypes.string,
//     placeholder: PropTypes.string,
//   }
//   componentDidMount() {
//     fetch('/userinfo')
//       .then(res => res.json())
//       .then(res => {this.state.id = res._id; this.setState(this.state);});
//   }
//   handleSubmit = e => {
//       const text = e.target.value.trim()
//       if (e.which === 13) {
//         if (text.length !== 0) {
//           this.addLable(text)
//           $.ajax({
//                  type: 'post',
//                  url: '/userinfo/addLable',
//                  data: JSON.stringify({id: this.state.id, lable: text, num: this.props.note.lables.length, note_id: this.props.note.id}),
//                  dataType: "json",
//                  contentType: "application/json",
//                  });
//         }
//           this.setState({ text: '' })
//       }
//   }
//   addLable(text){
//     this.props.note.lables = [...this.props.note.lables, {text: text, id:this.props.note.lables.length+1 }]
//   }
//   handleChange = e => {
//       this.setState({ text: e.target.value })
//   }
//     changeNote(val){
//       this.props.note.text  = val;
//       $.ajax({
//              type: 'post',
//              url: '/userinfo/chNote',
//              data: JSON.stringify({id: this.state.id, text: val, note_id: this.props.note.id}),
//              dataType: "json",
//              contentType: "application/json",
//              });
//     }
//     showLables(note){
//       return  (this.props.note.lables.map((lable) => {
//         return <span key={lable.id}>{lable}</span>
//       }))
//     }
//     showMarkDown(){
//       this.props.notes.foreach(note=>{if(this.props.note.id == note.id)
//         return (<div>
//         <MarkdownEditor  initialContent={this.props.note.text}  iconsSet="font-awesome"/>
//         <div>
//         Lables: {this.props.note.lables.map((lable) => {return <span key={lable.id}>#{lable.text} </span>})}
//         </div>
//         <br/>
//         <Input placeholder="add lable" value={this.state.text}
//               onChange={this.handleChange}
//               onKeyDown={this.handleSubmit}></Input>
//         <Button onClick={()=>{this.changeNote(document.getElementsByClassName('md-editor-textarea')[0].value)}}>Add note</Button>
//         </div>);})
//
//       }
//     render(){
//       if(!this.props.note){
//         return (<div>
//         <p>Here will be a text of chosen note</p>
//         </div>)
//       }
//       return (
//         <div>
//           {this.showMarkDown()}
//         </div>
//       );
//     }
// }
// function mapStateToProps(state){
//   return {
//     note: state.actNote,
//     notes: state.notes,
//   };
// }
// const matchDispatchToProps = dispatch => ({
//   actions: bindActionCreators(BookActions, dispatch)
// })
// export default connect(mapStateToProps,matchDispatchToProps)(MarkDown);
