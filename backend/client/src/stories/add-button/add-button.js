import Input from '../input/input';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const ButtonS= styled.button`
    color: white;
  	border:2px solid #CABBE9;
  	background : #CABBE9 !important;
    border-radius: 5px;
	text-decoration: none;
	user-select: none;
	font-size: 1.2em;
    margin-top: 0.3em;
    width: 190px;
	cursor : pointer;
	:hover, :active {
        background: #6C567B !important;
        border: 2px solid #6C567B;
 	}
`;
class AddButton extends React.Component {
    state={
        input : false,
    }
    render() {
        if(!this.state.input){
    	return <ButtonS className={cn( this.props.className)}
                onClick = {()=>{if(!this.state.input)this.setState({input:true})}}>
					{this.props.children}
                </ButtonS>;
        }
        else
            return <Input onMouseLeave ={()=>{if(this.state.input)this.setState({input:false})}} 
                          name={this.props.name} 
                          type={this.props.type}  
                          onChange = {this.props.onChange} 
                          onBlur={this.props.onBlur} 
                          placeholder={this.props.placeholder} 
                          value={this.props.value} 
                          onKeyDown={this.props.onKeyDown}/>
  	}
}

AddButton.propTypes = {
	onClick : PropTypes.func,
};

export default AddButton;
