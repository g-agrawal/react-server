import React, {Component} from 'react'
import axios from 'axios'

class Home extends Component {
    state = {
        posts : []
    }
    componentDidMount(){
        axios.get('/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                });
            });
    }
    render() {
        const {posts} = this.state;
        let postList = posts.length ? (
            posts.map(post => {
                return (
                    <div className="card" key={post.id}>
                        <div className="card-body">
                            <h5 className="card-title text-primary">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
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
            <div className="home container">
                <h4 className="mainContent center">Home</h4>
                {postList}
            </div>
        );
    }
}

export default Home;