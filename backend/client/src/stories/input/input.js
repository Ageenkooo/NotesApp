import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const InputS = styled.input`
	:active, :hover, :focus
	{
		outline: 0 !important;
		outline-offset: 0 !important;
		border-bottom: 2px solid #CABBE9 !important;
		color: #CABBE9 !important;
	}
	&.center
	{
		width : 180px;
		display: block;
    margin-left: auto;
    margin-right: auto ;
	}
	background-color: transparent;
	width : 150px;
  color: #6C567B !important;
  font-size: 2vh;
  padding: 0.5em 1em;
  border-bottom: 2px solid #6C567B !important;
	border-top : 0px;
	border-right : 0px;
	border-left : 0px;
  border-radius: 3px !important;
`;

const Input = ({className, onChange, type, placeholder, value, name,onKeyDown, onBlur})=>(
	<InputS className={cn( className)} name={name} type={type} onChange = {onChange} onBlur={onBlur} placeholder={placeholder} value={value} onKeyDown={onKeyDown}/>
);
export default Input;
