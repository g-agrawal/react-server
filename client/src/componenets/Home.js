import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import deleteImage from '../Images/deleteImage.png'
import editImage from '../Images/editImage.png'
import { deletePost } from '../actions/postAction'

class Home extends Component {
    handleDelete = (_id) => {
        this.props.onDeletePost(_id);
    } 
    render() {
        const {posts} = this.props;
        let postList = posts ? (
            posts.map(post => {
                return (
                    <div className="card  d-flex flex-row" key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title text-primary">{post.title}</h5>
                            <p className="card-text">{post.description}</p>                            
                        </div>
                        <div className="d-flex flex-column">
                            <input type="image" className="postModifyImage" id="deleteImage" onClick={() => {this.handleDelete(post._id)}} src={deleteImage} alt="Delete"/>
                            <Link to={'/Post/' + post._id}>
                                <input type="image" className="postModifyImage" id="editImage" src={editImage} alt="Edit"/>
                            </Link>
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

const mapStateToProps = state => {
    let searchPosts = state.posts;
    if(state.searchText) {
        searchPosts = state.posts.filter(post => post.title.toLowerCase().includes(state.searchText.toLowerCase()) || post.description.toLowerCase().includes(state.searchText.toLowerCase()));
    }
    return {
        posts: searchPosts
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: _id => {
            dispatch(deletePost(_id));
        }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Home);