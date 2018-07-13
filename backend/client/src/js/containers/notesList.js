import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from '../../stories/item/item'
import ModalWindow from '../../stories/modalWindow/modalWindow';
import * as BookActions from '../actions';
import AddButton from '../../stories/addButton/addButton';
import Cancel from '../../stories/cancelButton/cancelButton'
import Lable from '../../stories/lable/lable';
import {bindActionCreators} from 'redux';
import Div from '../../stories/div/div';

import $ from 'jquery';
window.jQuery = window.$ = $;

class Notes extends Component{
  constructor(props){
    super(props);
    this.state = {
          text: this.props.text || '',
          notes: [],
				  id: 0,
				};
  }
  
  componentDidMount() {
    this.fetchingData();
  }

  fetchingData(){
    fetch('/userinfo')
               .then(res => res.json())
               .then(res => {this.state.notes = res.notes; this.state.id = res._id; this.setState(this.state); return res.notes})
               .then(notes => {
                 notes.forEach(note => {if(note != null)this.props.actions.addNote(note)})
               }); 
  }
  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      if (text.length !== 0) {
        $.ajax({
               type: 'post',
               url: '/userinfo/note',
               data: JSON.stringify({id: this.state.id, book_id:this.props.book.id, name: text}),
               dataType: "json",
               contentType: "application/json",
               });
        this.fetchingData();
      }
      this.setState({ text: '' })
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  deleteNote(note){
    $.ajax({
           type: 'post',
           url: '/userinfo/delnote',
           data: JSON.stringify({id: this.state.id, note: note}),
           dataType: "json",
           contentType: "application/json",
           });
    this.props.actions.deleteNote(note.id);
  }

  showNotes(){
    return this.props.notes.map ((note) => {
      if(note.book_id===this.props.book.id)
        return (<div key={note.id}>
                  <Div key={note.id} className="flex flex-center">
                    <Item className={note.id === this.props.note.id ? 'chosen ' + 'notepad color' : 'notepad color' }
                          onClick={()=>{this.props.actions.selectNote(note)}} key={note.id} name ={note.name}>
                        <ModalWindow
    										trigger={<Cancel/>}
    										header='Delete!'
    										content='Do you really want to delete this note?'
    										actions={['May be later', { key: 'Yesss', content: 'Yesss', positive: true,onClick:() =>{ this.deleteNote(note);}  }]}/>        									
						
                    </Item>
                  </Div>
                </div>
                );
        });
    }


  render(){
    if(Object.keys(this.props.book).length === 0 || this.props.book.deleted){
      return (
        <div><Lable>Choose a book</Lable></div>)
    }
    return (
      <Div  className="flex-column">
          {this.showNotes()}
          <AddButton placeholder="new note" value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}>Add note</AddButton>
      </Div>
    );
  }
}

function mapStateToProps(state){
  return {
    book: state.actBook,
    notes: state.notes,
    note: state.actNote
  };
}
const matchDispatchToProps = dispatch => ({
  actions: bindActionCreators(BookActions, dispatch)
})

export default connect(mapStateToProps,matchDispatchToProps)(Notes);
