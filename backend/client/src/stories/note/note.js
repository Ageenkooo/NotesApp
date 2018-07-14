import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import notepad from '../../img/notepad.svg';

const LableS = styled.p `
  	color : #91DC5A;
	font-size : 1em;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
`;
const ImgS = styled.div `
	width : 30px;
	height : 30px;
	margin : 10px;
	background-image : url(${notepad});
	background-repeat : no-repeat;
	background-size : 100% 100%;
	border : 0px solid black;
`;
const Div = styled.div `
	width : 250px;
	overflow : hidden;
	display : flex;
	flex-direction : row;
	justify-content : space-between;
  	background-color : #E1FFCF;
	padding : 0 10px 0 0;
`;

class Note extends React.Component {
    render() {
        return <Div>
            <ImgS ></ImgS>
            <LableS className={cn(this.propsclassName)} onClick={this.props.onClick}>
                {this.props.children}
            </LableS>
        </Div>
    }
}

Note.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Note;
