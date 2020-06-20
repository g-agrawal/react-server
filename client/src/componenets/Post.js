import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/postAction';

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
    componentDidMount() {        
        if(this.props.post) {
            this.setState({
                _id: this.props.post._id,
                title: this.props.post.title,
                description: this.props.post.description
            });
        }
    }
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
        const postData = this.state;        
        this.props.onAddPost(postData);
        this.props.history.push('/');
    }
    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="postCard container">
                <div className="" >
                    <form className="postForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="postTitle">Title</label>                            
                            <input type="text" className="form-control" id="postTitle" name="title" required placeholder="Enter title" 
                                maxLength="50" value={this.state.title} onChange={this.handleChange}></input>
                            <label className="maxLabel">{this.state.titleCharAllowedMessage}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Description</label>
                            <textarea type="text" maxLength="100" rows="5" className="form-control" id="postDescription" name="description" required placeholder="Enter description" value={this.state.description} onChange={this.handleChange}></textarea>
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

const mapStateToProps = (state, ownProps) => {
    if(ownProps.match.params.postId) {
        let postId = ownProps.match.params.postId;
        return {
            post: state.posts.find(post => post._id === postId)
        };
    }
    return { };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => {
            dispatch(addPost(post));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);