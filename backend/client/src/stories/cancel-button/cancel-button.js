import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import cancel from '../../img/cancel.png';

const ButtonCancel= styled.div`
	width : 9px;
	height : 9px;
	background-repeat : no-repeat;
	cursor : pointer;
    background-image: url(${cancel});
    background-size : 100% 100%;	
    :hover{
        transform: scale(1.3);
    }
`;

class Cancel extends React.Component {
    render() {
    	return <ButtonCancel className={cn( this.props.className)}
						    onClick = {this.props.onClick}>
            	</ButtonCancel>;
  	}
}

Cancel.propTypes = {
	onClick : PropTypes.func,
};

export default Cancel;
