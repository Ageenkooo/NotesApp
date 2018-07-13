import { Modal } from 'semantic-ui-react';
import React from 'react';

const inlineStyle = {
    modal : {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
};

const ModalWindow = ({trigger, header, content, actions})=>(
	<Modal
            style={inlineStyle.modal}
            trigger={trigger}
            content = {content}
            header= {header}
            actions = {actions}
    		/>        									
);


export default ModalWindow;