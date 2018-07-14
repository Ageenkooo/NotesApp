import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const LableS = styled.span `
    color : white;
    background-color: #8bc63e;
    border-radius: 8px;
    padding-left: 4px;
    padding-right: 4px;
    margin-right: 0.5em;
	font-size : 2.5vh;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
    cursor: pointer;
`;

class NoteLable extends React.Component {
    render() {
        return <LableS className={cn(this.props.className)} onClick={this.props.onClick}>
            # {this.props.children}
        </LableS>
    }
}

NoteLable.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default NoteLable;
