import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from '../../stories/item/item'
import Input from '../../stories/input/input';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import * as BookActions from '../actions';
import Cancel from '../../stories/cancel-button/cancel-button'
import Lable from '../../stories/lable/lable';
import {bindActionCreators} from 'redux';
import Div from '../../stories/div/div';
import $ from 'jquery';
window.jQuery = window.$ = $;

const inlineStyle = {
	modal : {
	  marginTop: '0px !important',
	  marginLeft: 'auto',
	  marginRight: 'auto',
	}
};

class Notes extends Component{
  constructor(props){
    super(props);
    this.state = {text: this.props.text || '',
                  notes: [],
				  id: 0,
				open: false};
  }
  closeConfigShow = (closeOnEscape, closeOnRootNodeClick) => () => {
	this.setState({ closeOnEscape, closeOnRootNodeClick, open: true })
}

  close = () => this.setState({ open: false })
  
  componentDidMount() {
    this.fetchingData();
  }

  fetchingData(){
    fetch('/userinfo')
               .then(res => res.json())
               .then(res => {this.state.notes = res.notes; this.state.id = res._id; this.setState(this.state); return res.notes})
               .then(notes => {
                 notes.forEach(note => {if(note != null)this.props.actions.AddNoteS(note)})
               }); 
  }
  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      if (text.length !== 0) {
        // this.props.actions.addNote(this.props.book, text)
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
  }

  showNotes(){
    return this.props.notes.map ((note) => {
      if(note.book_id===this.props.book.id && !this.props.book.deleted)
        return (
                  <Div key={note.id} className="flex flex-center">
                    <Item className={note.id === this.props.note.id ? 'chosen ' + 'notepad color' : 'notepad color' }
                          onClick={()=>{this.props.actions.selectNote(note)}} key={note.id} name ={note.name}>
                        <Modal
											style={inlineStyle.modal}
    										trigger={<Cancel/>}
    										header='Delete!'
    										content='Do you really want to delete this note?'
    										actions={['May be later', { key: 'Yesss', content: 'Yesss', positive: true,onClick:() =>{ this.deleteNote(note); this.props.actions.deleteNote(note.id);}  }]}/>        									
						
                    </Item>
                  </Div>
                );
        });
    }


  render(){
    if(Object.keys(this.props.book).length === 0 || this.props.book.deleted){
      return (
        <div><Lable>Choose a book</Lable></div>)
    }
    return (
      <div>
          {this.showNotes()}
          <Input placeholder="new note" value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}></Input>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    book: state.active,
    notes: state.notes,
    lables: state.lable,
    note: state.actNote
  };
}
const matchDispatchToProps = dispatch => ({
  actions: bindActionCreators(BookActions, dispatch)
})
export default connect(mapStateToProps,matchDispatchToProps)(Notes);
