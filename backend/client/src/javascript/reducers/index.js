import {combineReducers} from 'redux';
import {ActiveBook, ActionsOnBook} from './books';
import {ActionsOnNote, ActiveNote} from './notes';


const allReducers = combineReducers({
    books : ActionsOnBook,
    actBook: ActiveBook,
    notes: ActionsOnNote,
    actNote : ActiveNote,
});

export default allReducers;
