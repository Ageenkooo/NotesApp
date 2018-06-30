import React from 'react';
import {connect} from 'react-redux';
import Input from './stories/input/input'
import Button from './stories/button/button'
import * as BookActions from './js/actions';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
var Markdown = require('markdown').markdown;

class MarkDown extends React.Component{

  	state = {
    	text: this.props.text || '', 
    	showingText: true,
  	}

  	componentDidMount() {
	  	fetch('/userinfo')
	  		.then(res => res.json())
	  		.then(res => {this.state.id = res._id; this.setState(this.state);});
    }

  	handleSubmit(e){
		const text = e.target.value.trim();

		let currentId = this.state.id;
		let currentNum = this.props.note.lables.length;
		let currentNoteId = this.props.note.id; 

      	if (e.which === 13) {
        	if (text.length !== 0) {
          		this.addLable(text)
          		$.ajax({
                  	type: 'post',
                  	url: '/userinfo/addLable',
                  	data: JSON.stringify({id: currentId, lable: text, num: currentNum, note_id: currentNoteId}),
                  	dataType: "json",
                  	contentType: "application/json",
                });
        	}
          	this.setState({ text: '' })
      	}
	}
	  
  	addLable(text){
		let newLableId = this.props.note.lables.length + 1;
    	this.props.note.lables = [...this.props.note.lables, {id: newLableId, text: text}]
	}
	  
  	handleChange(e){
      	this.setState({ text: e.target.value })
	}
	  
    changeNote(val){
		this.props.note.text  = val;
		let currentId = this.state.id;
		let noteId = this.props.note.id;

      	$.ajax({
            type: 'post',
            url: '/userinfo/chNote',
            data: JSON.stringify({id: currentId, text : val, note_id: noteId}),
            dataType: "json",
            contentType: "application/json",
        });
	}
	
    showLables(note){
      	return  (this.props.lables.map( (lable) => {
        	if(lable.id === note.id)
        		return <span key={lable.id}>{lable}</span>
      	}))
	}
	
    Show(){
		console.log(this.props.note.id)
        return this.props.notes.map ( (note) => {
        	if(note.id===this.props.note.id && !this.state.showingText)
              	return (<div key={note.id}>
							<MarkdownEditor styles={{styleMarkdownTextArea: {height: "35vh"},
													styleMarkdownPreviewArea: {height: "35vh", overflow: "scroll", "overflow-x": "hidden", "border-bottom":"solid lightgrey 1px" }}} 
													initialContent={note.text}  
													iconsSet="font-awesome"/>
              				<div>
              					Lables: {note.lables.map((lable) => {return <span key={lable.id}>#{lable.text} </span>})}
              				</div>
              				<br/>
              				<Input placeholder="add lable" value={this.state.text}
                    									onChange={this.handleChange}
                    									onKeyDown={this.handleSubmit}></Input>
              				<Button onClick={()=>{this.changeNote(document.getElementsByClassName('md-editor-textarea')[0].value); this.setState({showingText: true})}}>Add note</Button>
              			</div>);
            else if (note.id===this.props.note.id )
            	return (<div key={note.id}>Double click to edit text of chosen note<div key={note.id} dangerouslySetInnerHTML={{ __html:Markdown.toHTML(note.text)}}></div></div>)
        });
	}
	
    render(){
      	if(!this.props.note.id){
        	return (<div>
        				<p>Here will be a text of chosen note</p>
        			</div>)
      	}
      	else return (<div onDoubleClick={()=>{if(this.state.showingText)this.setState({showingText: false})}}>
          				{this.Show()}
        			</div>
      	);
    }
}

function mapStateToProps(state){
  	return {
    	note: state.actNote,
    	notes: state.notes
  	};
}

const matchDispatchToProps = dispatch => ({
  	actions: bindActionCreators(BookActions, dispatch)
})

export default connect(mapStateToProps,matchDispatchToProps)(MarkDown);
