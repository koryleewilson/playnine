import React from 'react';
import './App.css';

class UserScore extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        return <div className="backdrop" >
            <span>test2</span>
            <div className="modal">
                <div className="footer">
                    <button onClick={this.props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default UserScore;