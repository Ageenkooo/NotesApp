import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers';
import Page from './components/Page';

const store = createStore(allReducers);

class Books extends Component {
    render() {
        return (<Provider store={store}>
            <Page/>
        </Provider>);
    }
}
export default Books;
