import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import user from '../../img/user.svg';

const LableS = styled.p`
  	color : #430F58;
	font-size : 1em;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
	padding-bottom: 0 !important;
	margin-bottom: 0 !important;
	
`; 

const ImgS = styled.img`
	width : 30px;
	height : 30px;
	margin : 10px;
	background-repeat : no-repeat;
	background-size : 100% 100%;
`;

const Div = styled.div`
	width : 220px;
	overflow : hidden;
	display : flex;
	flex-direction : row;
	justify-content : flex-end;
	align-items: center;
	padding : 0px 10px;
	:hover{
		font-style: italic;
		cursor: pointer;
	}
`;

const User = ({children, className, onClick})=>(
	<Div className={cn( className)}>
		<LableS  className={cn( className)} onClick = {onClick}>
			{children}
		</LableS>
    <ImgS src={user}/>
	</Div>
);

User.propTypes = {
	children : PropTypes.string.isRequired,
	onClick : PropTypes.func,
};

export default User;
