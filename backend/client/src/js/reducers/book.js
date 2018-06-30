import { ADD_NOTE, DELETE_ALL, DELETE_NOTE, NOTE_SELECTED, ADD_NOTES } from '../constants/ActionTypes'


const  initialState = [];

export  function ActiveNote(state = {}, action) {
  switch (action.type) {
    case NOTE_SELECTED:
      action.payload.selected = true;
      return action.payload;
      break;
    default:
      return state;
  }
}

export  function Notes(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
    return [
      ...state,
      {
        book_id:action.payload.id,
        id: state.reduce((maxId, note) => Math.max(note.id, maxId), 0) + 1,
        name:action.text,
        text:"put your text here",
        deleted: false,
        lables: []
      }
    ]
    break;
    case ADD_NOTES:
    return [
      ...state,
      {
        book_id:action.note.book_id,
        id: action.note.id,
        name:action.note.name,
        text:action.note.text,
        deleted: false,
        lables: action.note.lables
      }
    ]
    break;
    case DELETE_NOTE:
    state.map((note) => {if(note.id===action.id) note.deleted = true} )
      return state.filter(note =>
        note.id !== action.id
      )
    case DELETE_ALL:
    return state.filter(note =>
      note.book_id !== action.payload.id
    )
    default:
      return state;
  }
}
