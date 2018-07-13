import React from 'react';
import styled from 'styled-components';
import book from '../../img/book.png';
import notepad from '../../img/notepad.svg';

const LableS = styled.p`
  	color : #430F58;
	margin: 2px;
	font-size : 1em;
	font-family: Geneva, Arial, Helvetica, sans-serif;
	font-weight : 500;
	&.chosen{
		text-decoration: underline;
		font-style: italic;
		text-decoration-color: #CABBE9;
	}
`;

const ImgS = styled.div`
	width : 25px;
	height : 25px;
	background-repeat : no-repeat;
	background-image : url(${book});
	background-size : 100% 100%;
	border: none !important;
	&.notepad{
		background-image : url(${notepad});
	}
`;

const Div = styled.div`
	width : 200px;
	display : flex;
	flex-direction : row;
	justify-content : space-between;
	align-items: center;
	padding: 7px 20px;
	background-color: white;
	border-left: 5px solid #8bc63e;
	border-radius: 5px;
	cursor: pointer;
`;

class Item extends React.Component{
	render(){
		return <Div className={this.props.className} onClick = {this.props.onClick}>
					<ImgS className={this.props.className}/>
					<LableS  className={this.props.className} onDoubleClick={this.props.onDoubleClick}>
						{this.props.name}
					</LableS>
					{this.props.children}
				</Div>
	}
}
export default Item;
