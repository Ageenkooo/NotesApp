import { BOOK_SELECTED, ADD_BOOK, DELETE_BOOK} from '../constants/ActionTypes';

const  initialState = [];

export  function ActiveBook(state = {}, action) {
  switch (action.type) {
    case BOOK_SELECTED:
      action.payload.selected = true;
      return action.payload;
    default:
      return state;
  }
}

export function ActionsOnBook(state = initialState, action) {
  switch (action.type) {
      case ADD_BOOK:
        return [
          ...state,
          {
            id: action.book.id,
            book: action.book.book,
            note: "null"
          }
        ]
    case DELETE_BOOK:
    state.map((book) => {if(book.id===action.id) book.deleted = true} )
      return state.filter(book =>
        book.id !== action.id
      )
    default:
      return state
  }
}
