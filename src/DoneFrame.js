import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class DoneFrame extends React.Component {
    constructor() {
        super();

        this.state = {
            userName: "none",
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    handleNameChange(event) {
        this.setState({userName: event.target.value});
    }

    saveUser() {
        alert(this.state.userName);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    };

    closeModal() {
        this.setState({modalIsOpen: false});
    };

    render() {
        return (
            <div className="text-center">
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-secondary" onClick={this.props.resetGame}>Play Again</button>
                {this.props.doneStatus === 'Done. Nice!' ?
                    <div>
                        <br/>
                        <button className="btn btn-secondary" onClick={this.openModal}>Save Score</button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            //onAfterOpen={props.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}>Save your score?</h2>
                            <br/>
                            <form>
                                Name:&nbsp;<input onChange={this.handleNameChange}/>&nbsp;
                                <button onClick={this.saveUser}>Save</button>
                            </form>
                            <br/>
                            <button onClick={this.closeModal}>close</button>
                        </Modal>
                    </div> : ''}
            </div>

        );
    };
}

export default DoneFrame;