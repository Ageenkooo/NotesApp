import React, {Component} from 'react';
import Lable from '../../stories/lable/lable';
import Form from '../../stories/form/form';
import Input from '../../stories/input/input';
import Button from '../../stories/button/button';
import $ from 'jquery';
window.jQuery = window.$ = $;

class LogIn extends Component {

    static contextTypes = {
        router: React.PropTypes.object
	}
	
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
	}
	
    onChange(e){
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
	}
	
    onSubmit(e){
        e.preventDefault();
        $.ajax({ 
            type: 'post',
            url: '/user/login',
            data: JSON.stringify({email: this.state.email, password: this.state.password}),
            dataType: 'json',
            contentType: 'application/json',
            success: (data) => {
                if (data == 'Access') {
                    this.context.router.history.push('/');
                }
            }
        });
	}
    
    render() {
        return (
            <Form
                className='center white'
                onSubmit={this.onSubmit}
                action='/signIn'
                method='post'>
                <Lable className='center'>Sign in</Lable>
                <br/>
                <Lable className='center medium'>Your e-mail</Lable>
                <Input
                    type='text'
                    className='center'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}/>
                <Lable className='center medium'>Password</Lable>
                <Input
                    type='password'
                    className='center'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}/>
                <br/>
                <Button className='center' type='submit' value='Done'>Done</Button>
            </Form>
        );
    }
}

export default LogIn;
