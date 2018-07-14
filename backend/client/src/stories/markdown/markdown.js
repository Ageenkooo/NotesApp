import React from 'react';
import {connect} from 'react-redux';
import Button from '../button/button';
import Div from '../div/div';
import NoteLable from '../noteLable/noteLable';
import * as BookActions from '../../js/actions';
import AddButton from '../addButton/addButton';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
var Markdown = require('markdown').markdown;

class MarkDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            text: this.props.text || '',
            showingText: true,
            lables: [],
            note: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchingData = this.fetchingData.bind(this);
        this.showLables = this.showLables.bind(this)
    }

    handleSubmit(e) {
        const text = e.target.value.trim();
        let currentId = this.state.id;
        let currentNoteId = this.props.note.id;

        if (e.which === 13) {
            if (text.length !== 0) {
                $.ajax({
                    type: 'post',
                    url: '/userinfo/addLable',
                    data: JSON.stringify({id: currentId, lable: text, note_id: currentNoteId}),
                    dataType: 'json',
                    contentType: 'application/json'
                });
            }
            this.setState({text: ''})
        }
	}
	
    deleteLable(lable, note) {
        $.ajax({
            type: 'post',
            url: '/userinfo/deleteLable',
            data: JSON.stringify({id: this.state.id, lable_id: lable.id, note_id: note}),
            dataType: 'json',
            contentType: 'application/json'
        });
        this.fetchingData(this.props.note);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    changeNote(val) {
        this.props.note.text = val;
        let noteId = this.props.note.id;

        $.ajax({
            type: 'post',
            url: '/userinfo/changeNote',
            data: JSON.stringify({text: val, note_id: noteId}),
            dataType: 'json',
            contentType: 'application/json'
        });
    }

    fetchingData(note) {
        fetch('/userinfo')
            .then(res => res.json())
            .then(res => {
                this.state.id = res._id;
                return res.notes
            })
            .then(res => {
                res.map((noteRes) => {
                    if (note.id == noteRes.id) {
                        this.state.lables = noteRes.lables;
                        this.state.note = noteRes.id;
                        this.setState(this);
                        return noteRes.lables;
                    }
                })
            })
	}
	
    showLables() {
        return this.state.lables.map((lable) => {
                return <NoteLable
                    			key={lable.id}
								onClick={() => this.deleteLable(lable, this.state.note)}>
								{lable.text}</NoteLable>
            })
	}
	
    Show() {
        this.fetchingData(this.props.note);
        return this.props.notes.map((note) => {
                if (note.id === this.props.note.id && !this.state.showingText) 
                    return (
                        <Div className='markdown' key={note.id}>
                            <MarkdownEditor
                                styles={{
                                    styleMarkdownTextArea: {
                                        height: '35vh'
                                    },
                                    styleMarkdownPreviewArea: {
                                        height: '35vh',
                                        overflow: 'scroll',
                                        'overflow-x': 'hidden',
                                        'border-bottom': 'solid lightgrey 1px'
                                    }
                                }}
                                initialContent={note.text}
                                iconsSet='font-awesome'/>
                            <div>
                                Lables: {this.showLables()}
                                <AddButton
                                    className={'small'}
                                    placeholder='add lable'
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleSubmit}>Add lable
                                </AddButton>
                            </div>
                            <hr/>
                            <Button
                                onClick={() => {
                                    this.changeNote(document.getElementsByClassName('md-editor-textarea')[0].value);
                                    this.setState({showingText: true})
                                }}>Add note</Button>
                        </Div>
                    );
                else if (note.id === this.props.note.id) 
                    return (
                        <div key={note.id}>Double click to edit text of chosen note
							<div
                            	key={note.id}
                            	dangerouslySetInnerHTML={{ __html: Markdown.toHTML(note.text)}}></div>
                        </div>
                    )
            });
    }

    render() {
        if (!this.props.note.id) {
            return (
                <div>
                    <p>Here will be a text of chosen note</p>
                </div>
            )
        } else 
            return (
                <div
                    onDoubleClick={() => {
                        if (this.state.showingText) 
                            this.setState({showingText: false})
                    }}>
                    {this.Show()}
                </div>
            );
        }
    }

function mapStateToProps(state) {
    return {note: state.actNote, notes: state.notes};
}

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators(BookActions, dispatch)
})

export default connect(mapStateToProps, matchDispatchToProps)(MarkDown);
