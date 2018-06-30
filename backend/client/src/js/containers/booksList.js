import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import Item from '../../stories/item/item';
import Input from '../../stories/input/input';
import Cancel from '../../stories/cancel-button/cancel-button'
import Div from '../../stories/div/div'
import * as BookActions from '../actions';
import PropTypes from 'prop-types'
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
          		// let new_book = {book: text}
				// this.props.actions.addBook(new_book)
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
    	$.ajax({
           type: 'post',
           url: '/userinfo/delbook',
           data: JSON.stringify({id: this.state.id, book: book}),
           dataType: "json",
           contentType: "application/json",
        });
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
    										actions={['May be later', { key: 'Yesss', content: 'Yesss', positive: true,onClick:() =>{this.props.actions.deleteBook(book.id), this.props.actions.deleteAll(book), this.deleteBook(book)}  }]}/>        									
          						</Item>
        				</Div>
         			</div>);
      	});
  	}

  render(){
    return (
          <div>
            {this.showList()}
            <Input 
            placeholder="new book" value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}></Input>
              </div>
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
