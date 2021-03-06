import React from 'react';
import ReactDOM from 'react-dom';
import LogIn from './js/components/login';
import Registration from './js/components/registration';
import Main from './js/components/main';
import Books from './js/index';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import styled from 'styled-components';
import backgr from './img/back.jpg';
import 'semantic-ui-css/semantic.min.css';

const Div = styled.div `
	width : 100vw;
    height: 100vh;
    position: absolute;
	background-image: url(${backgr});
    background-repeat: no-repeat;
    background-size: 100% 100%;
`;

ReactDOM.render(
    <BrowserRouter>
        <Div>
            <Switch>
                <Route exact='exact' path='/main' component={Main}/>
                <Route exact='exact' path='/' component={Books}/>
                <Route exact='exact' path='/login' component={LogIn}/>
                <Route exact='exact' path='/registration' component={Registration}/>
            </Switch> 
        </Div>
    </BrowserRouter>,
    document.getElementById(
        'root'
    )
)

registerServiceWorker();
