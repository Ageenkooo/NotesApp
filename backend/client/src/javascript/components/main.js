import React, {Component} from 'react';
import Lable from '../../stories/lable/lable';
import Form from '../../stories/form/form';
import Button from '../../stories/button/button';
import {Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
class Main extends Component {
    render() {
        return (
            <Form className='center shorter'>
                <Lable className='center'>Hello, it is Notes App</Lable>
                <Lable className='center'>Start Now !</Lable>
                <br/>
                <Link exact='exact' to='/registration'>
                    <Button>Registrate</Button>
                </Link>
                <Link exact='exact' to='/login'>
                    <Button>LogIn</Button>
                </Link>
            </Form>
        );
    }
}

export default Main;
