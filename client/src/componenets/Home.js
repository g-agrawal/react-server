import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import deleteImage from '../Images/deleteImage.png'
import editImage from '../Images/editImage.png'

class Home extends Component {
    state = {
        posts : [],
        redirect: null,
        redirectParam: {
            _id: null,
            title: "",
            description: ""
        }
    }
    componentDidMount(){
        axios.get('/posts')
            .then(res => {
                //console.log(res);
                this.setState({
                    posts: res.data
                });
            });
    }
    handleDelete = (_id) => {
        const posts = this.state.posts.filter(post => post._id !== _id);
        this.setState({ posts });
        let deleteUrl = '/deletePost/' + _id;
        axios.delete(deleteUrl)
            .then(res => {
                console.log(res.data.message);
            });
    } 
    handleEdit = (post) => {
        this.setState({
            redirect: '/Post',
            redirectParam: post
        });
    } 
    render() {
        if(this.state.redirect) {
            const post = this.state.redirectParam;
            return <Redirect to={{
                 pathname: this.state.redirect ,
                 state: { post }
            }} />
        }
        const {posts} = this.state;
        let postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="card  d-flex flex-row" key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title text-primary">{post.title}</h5>
                            <p className="card-text">{post.description}</p>                            
                        </div>
                        <div className="d-flex flex-column">
                            <input type="image" className="postModifyImage" id="deleteImage" onClick={() => {this.handleDelete(post._id)}} src={deleteImage} alt="Delete"/>
                            <input type="image" className="postModifyImage" id="editImage" onClick={() => {this.handleEdit(post)}} src={editImage} alt="Edit"/>
                        </div>
                    </div>
                )
            })
        ) : (
        <div>
            Please wait while loading content...
        </div>
        );
        return (
            <div className="mainContent home container">
                {postList}
            </div>
        );
    }
}

export default Home;