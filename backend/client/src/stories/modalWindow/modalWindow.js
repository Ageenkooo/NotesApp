import {Modal} from 'semantic-ui-react';
import React from 'react';

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class ModalWindow extends React.Component {
    render() {
    return <Modal
        style={inlineStyle.modal}
        trigger={this.props.trigger}
        content={this.props.content}
        header={this.props.header}
        actions={this.props.actions}/>
    }
}

export default ModalWindow;