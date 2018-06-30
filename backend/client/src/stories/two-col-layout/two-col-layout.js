import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';

const Div = styled.div`
	&.left{
		width : 20%;
		// background-color:#FFFDE1;
	}
	&.middle{
		width: 20%;
	}
	&.right{
		width: 60%;
	}
	&.flex{
		padding : 1%;
		width:98%;
		display : flex;
		flex-direction : row;
	}
	&.flex-center{
		justify-content:space-between;
	}
	&.flex-left{
		justify-content: flex-start;
	}
	&.flex-right{
		justify-content: flex-end;
	}
`;


export default Div;
