import { BOOK_SELECTED, ADD_BOOK, DELETE_BOOK, ADD_BOOKS } from '../constants/ActionTypes'

const  initialState = []

export  function ActiveBook(state = {}, action) {
  switch (action.type) {
    case BOOK_SELECTED:
      action.payload.selected = true;
      return action.payload;
      break;
    default:
      return state;
  }
}

export function Actions(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      
      return [
        ...state,
        {
          id: state.reduce((maxId, book) => Math.max(book.id, maxId), 0) + 1,
          book: action.book.book,
          note: "null"
        }
      ]
      case ADD_BOOKS:
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
