import React, {Component} from 'react'
import axios from 'axios'

class Refresh extends Component {
    state = {
        isSuccess: false,
        message: "Please wait while refreshing..."
    }
    componentDidMount(){
        axios.get('/refresh')
            .then(res => {                
                this.setState({
                    message: res.data.message
                });
            });
    }
    render() {
        return (
            <div className="mainContent container">
                <h4 className="center">Refresh</h4>
                <div className="center">
                    <p>{this.state.message}</p>
                </div>
            </div>
        );
    }
}

export default Refresh;