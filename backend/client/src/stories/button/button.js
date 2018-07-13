import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const ButtonS= styled.button`
	color: white ;
	background: #6C567B !important;
	text-decoration: none;
	user-select: none;
	font-size: 1.2em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #6C567B;
	border-radius: 3px;
	cursor : pointer;
	:hover {
  		color: #6C567B;
  		border:2px solid #6C567B;
  		background : white !important;
 	}
	:active {
  		background: white ;
  		color: #6C567B;
  		border:1px solid #C06C84;
 	}
`;

class Button extends React.Component {
    render() {
    	return <ButtonS className={cn( this.props.className)}
						  onClick = {this.props.onClick} 
						  disabled={this.props.disabled} 
						  type ={this.props.type}>
					{this.props.children}
            	</ButtonS>;
  	}
}

Button.propTypes = {
	onClick : PropTypes.func,
};

export default Button;
