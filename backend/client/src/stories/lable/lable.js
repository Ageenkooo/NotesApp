import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const LableS = styled.p `
  	color : #6C567B;
	font-size : 2.5vh;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
	&.center{
		text-align : center;
		width : 100%;
	}
  	&.medium {
		color : #6C567B;
		font-size : 2vh;
	}
`;

class Lable extends React.Component {
    render() {
    return <LableS className={cn(this.props.className)} onClick={this.props.onClick}>
        {this.props.children}
    </LableS>
	}
}

Lable.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Lable;
