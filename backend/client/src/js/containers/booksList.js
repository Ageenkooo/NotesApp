import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import Item from '../../stories/item/item';
import AddButton from '../../stories/add-button/add-button';
import Cancel from '../../stories/cancel-button/cancel-button'
import Div from '../../stories/div/div'
import * as BookActions from '../actions';

import $ from 'jquery';
window.jQuery = window.$ = $;

const inlineStyle = {
  	modal : {
    	marginTop: '0px !important',
    	marginLeft: 'auto',
    	marginRight: 'auto',
	  }
};

class BooksList extends Component{
	constructor(props){
		super(props);
		this.state = {
    		text: this.props.text || '',
			books : [],
			id : 0,
		}
  	}
	
  	componentDidMount() {
    	this.fetchingData();
  	}
	fetchingData(){
		fetch('/userinfo')
    		.then(res => res.json())
      		.then(res => {this.state.books = res.books; this.state.id = res._id; this.setState(this.state); return res.books;})
      		.then(books => {books.forEach(book => {if(book != null) this.props.actions.AddBookS(book)})});
	}
  	handleSubmit = e => {
      	const text = e.target.value.trim()
      	if (e.which === 13) {
        	if (text.length !== 0) {
          		$.ajax({
                 	type: 'post',
                 	url: '/userinfo/book',
                 	data: JSON.stringify({id: this.state.id, book: text}),
                 	dataType: "json",
                 	contentType: "application/json",
				});
				this.fetchingData();
        	}
          	this.setState({ text: '' })
      	}
	  }
	  
  	deleteBook(book){
		this.props.notes.map((note)=>{
			if(note.book_id === book.id){
				$.ajax({
					type: 'post',
					url: '/userinfo/delnote',
					data: JSON.stringify({id: this.state.id, note: note}),
					dataType: "json",
					contentType: "application/json",
				});
				this.props.actions.deleteNote(note.id);
			}
		})
		
    	$.ajax({
           type: 'post',
           url: '/userinfo/delbook',
           data: JSON.stringify({id: this.state.id, book: book}),
           dataType: "json",
           contentType: "application/json",
		});
		this.props.actions.deleteBook(book.id)
		
  	}

  	handleChange = e => {
      	this.setState({ text: e.target.value })
  	}
  
  	showList(){
    	return this.props.books.map ((book) => {
      		return (<div key={book.id}>
        				<Div  className="flex flex-center">
							  	<Item 
									  className={book.id === this.props.book.id ? 'chosen '  : ' ' } 
									  onClick={()=>this.props.actions.select(book)}  
									  name={book.book}>
									<Modal
											style={inlineStyle.modal}
    										trigger={<Cancel/>}
    										header='Delete!'
    										content='Do you really want to delete this book?'
    										actions={['May be later', { key: 'Yesss', content: 'Yesss', positive: true,onClick:() =>{ this.deleteBook(book)}  }]}/>        									
          						</Item>
        				</Div>
         			</div>);
      	});
  	}

  render(){
    return (
		<Div  className="flex-column">
            {this.showList()}
            <AddButton 
            placeholder="new book" value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}>Add book</AddButton>
             </Div>
            )
          }
}

function mapStateToProps(state){
    return {
        books: state.books,
        book: state.active,
        notes: state.notes
    };
}

const matchDispatchToProps = dispatch => ({
  actions: bindActionCreators(BookActions, dispatch)
})
export default connect(mapStateToProps, matchDispatchToProps)(BooksList);
