import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Item from '../../stories/item/item';
import AddButton from '../../stories/addButton/addButton';
import ModalWindow from '../../stories/modalWindow/modalWindow';
import Cancel from '../../stories/cancelButton/cancelButton';
import Div from '../../stories/div/div';
import * as BookActions from '../actions';
import $ from 'jquery';
window.jQuery = window.$ = $;
class BooksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text || '',
            books: [],
            id: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchingData();
    }

    fetchingData() {
        fetch('/userinfo')
            .then(res => res.json())
            .then(res => {
                this.state.books = res.books;
                this.state.id = res._id;
                this.setState(this.state);
                return res.books;
            })
            .then(books => {
                books.forEach(book => {
                        this.props.actions.addBook(book);
                    })
            });
	}
	
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            if (text.length !== 0) {
                $.ajax({
                    type: 'post',
                    url: '/userinfo/addBook',
                    data: JSON.stringify({id: this.state.id, book: text}),
                    dataType: 'json',
                    contentType: 'application/json'
                });
                this.fetchingData();
            }
            this.setState({text: ''});
        }
    }

    deleteBook(book) {
        this.props.notes.map((note) => {
                if (note.book_id === book.id) {
                    $.ajax({
                        type: 'post',
                        url: '/userinfo/deleteNote',
                        data: JSON.stringify({id: this.state.id, note: note}),
                        dataType: 'json',
                        contentType: 'application/json'
                    });
                    this.props.actions.deleteNote(note.id);
                }
            })
        $.ajax({
            type: 'post',
            url: '/userinfo/deleteBook',
            data: JSON.stringify({id: this.state.id, book: book}),
            dataType: 'json',
            contentType: 'application/json'
        });
        this.props.actions.deleteBook(book.id);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    showList() {
        return this.props.books.map((book) => {
                return (
                    <div key={book.id}>
                        <Div className='flex flex-center'>
                            <Item
                                className={book.id === this.props.book.id ? 'chosen ' : ' '}
                                onClick={() => this.props.actions.select(book)}
                                name={book.book}>
                                <ModalWindow
                                    trigger={<Cancel/>}
                                    header='Delete!'
                                    content='Do you really want to delete this book?'
                                    actions={[
                                        'May be later', {
                                            key: 'Yesss',
                                            content: 'Yesss',
                                            positive: true,
                                            onClick: () => {this.deleteBook(book)}
                                        }
                                    ]}/>
                            </Item>
                        </Div>
                    </div>
                );
            });
    }

    render() {
        return (
            <Div className='flex-column'>
                {this.showList()}
                <AddButton
                    placeholder='new book'
                    value={this.state.text}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit}>Add book</AddButton>
            </Div>
        )
    }
}

function mapStateToProps(state) {
    return {books: state.books, book: state.actBook, notes: state.notes};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(BookActions, dispatch)
})
export default connect(mapStateToProps, matchDispatchToProps)(BooksList);
