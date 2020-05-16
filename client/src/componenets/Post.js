import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component {
    state = {
        title: "",
        description: ""
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //const postData = new FormData(event.target);
        const postData = this.state;
        axios.post('/addPost', postData)
            .then(res => {
                //console.log('Response from server ' + res);
            });
        this.setState({
            title: "",
            description: ""
        });
        //this.props.history.push("/");
    }
    render(){
        return (
            <div className="postCard container">
                <div className="" >
                    <form className="postForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="postTitle">Title</label>
                            <input type="text" className="form-control" id="postTitle" name="title" placeholder="Enter title" value={this.state.title} onChange={this.handleChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Description</label>
                            <textarea type="text" className="form-control" id="postDescription" name="description" placeholder="Enter description" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-success btn-sm">Submit</button>
                    </form>
                    </div>
            </div>
        );
    }
}

export default Post;