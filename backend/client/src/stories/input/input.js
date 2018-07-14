import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

const InputS = styled.input `
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

class Input extends React.Component {
    render() {
            return <InputS
                    className={cn(this.props.className)}
                    name={this.props.name}
                    type={this.props.type}
                    onMouseLeave={this.props.onMouseLeave}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onKeyDown={this.props.onKeyDown}/>
	}
}

export default Input;
