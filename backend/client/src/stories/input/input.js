import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const InputS = styled.input`
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
	&.small{
		width: 100px;
		margin-top: 0.3em;
	}
	:active, :hover, :focus
	{
		outline: 0 !important;
		outline-offset: 0 !important;
		border-bottom: 2px solid #CABBE9 !important;
		color: #CABBE9 !important;
	}
	&.center
	{
		width : 200px;
		display: block;
    margin-left: auto;
    margin-right: auto ;
	}
`;

const Input = ({className, onChange, type, placeholder, value, name,onKeyDown, onBlur, onMouseLeave})=>(
	<InputS className={cn( className)} name={name} type={type} onMouseLeave={onMouseLeave} onChange = {onChange} onBlur={onBlur} placeholder={placeholder} value={value} onKeyDown={onKeyDown}/>
);
export default Input;
