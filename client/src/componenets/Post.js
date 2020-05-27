import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component {
    state = {
        _id: null,
        title: "",
        description: "",
        message: "After submit you will be redirected to home !!",
        titleCharAllowedMessage: "Enter between 1 to 50 character(s)",
        descriptionCharAllowedMessage: "Enter between 1 to 100 character(s)",
        isOriginal: true
    };
    handleChange = (event) => {
        // Read More
        //https://bootsnipp.com/snippets/ZVKyx
        if(event.target.name === "title") {
            let remainingChars = 50 - event.target.value.length;
            remainingChars = remainingChars < 0 ? 0 : remainingChars
            if(remainingChars >= 0) {
                // eslint-disable-next-line
                this.state.titleCharAllowedMessage = remainingChars + ' character(s) remaining'
            }
        }
        if(event.target.name === "description") {
            let remainingChars = 100 - event.target.value.length;
            remainingChars = remainingChars < 0 ? 0 : remainingChars
            if(remainingChars >= 0) {
                // eslint-disable-next-line
                this.state.descriptionCharAllowedMessage = remainingChars + ' character(s) remaining'
            }
        }
        this.setState({
            [event.target.name]: event.target.value,
            isOriginal: false
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //const postData = new FormData(event.target);
        this.setState({
            message: 'Please wait while submitting your post and redirecting to Home !!'
        });
        const postData = this.state;
        axios.post('/addPost', postData)
            .then(res => {
                console.log('Response from server ');
                console.log(res);
                this.props.history.push('/');
            });
    }
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }
    render(){
        if(this.props.location.state && this.state.isOriginal){
            // eslint-disable-next-line
            this.state._id = this.props.location.state.post._id;
            // eslint-disable-next-line
            this.state.title = this.props.location.state.post.title;
            // eslint-disable-next-line
            this.state.description = this.props.location.state.post.description;
        }
        return (
            <div className="postCard container">
                <div className="" >
                    <form className="postForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="postTitle">Title</label>                            
                            <input type="text" className="form-control" id="postTitle" name="title" placeholder="Enter title" 
                                maxLength="50" value={this.state.title} onChange={this.handleChange}></input>
                            <label className="maxLabel">{this.state.titleCharAllowedMessage}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Description</label>
                            <textarea type="text" maxLength="100" rows="5" className="form-control" id="postDescription" name="description" placeholder="Enter description" value={this.state.description} onChange={this.handleChange}></textarea>
                            <label className="maxLabel">{this.state.descriptionCharAllowedMessage}</label>
                        </div>
                        <button type="submit" className="btn btn-success btn-sm">Submit</button>
                        <button className="btn btn-success btn-sm ml-2" onClick={this.handleCancel}>Cancel</button>
                        <div>
                            <label className="maxLabel ml-0">{this.state.message}</label>
                        </div>
                    </form>
                    </div>
            </div>
        );
    }
}

export default Post;