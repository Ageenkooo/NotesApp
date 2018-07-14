import { ADD_NOTE,  DELETE_NOTE, NOTE_SELECTED} from '../constants/ActionTypes';


const  initialState = [];

export  function ActiveNote(state = {}, action) {
  switch (action.type) {
    case NOTE_SELECTED:
      action.payload.selected = true;
      return action.payload;
    default:
      return state;
  }
}

export  function ActionsOnNote(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
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
    case DELETE_NOTE:
    state.map((note) => {if(note.id===action.id) note.deleted = true} )
      return state.filter(note =>
        note.id !== action.id
      )
    default:
      return state;
  }
}
