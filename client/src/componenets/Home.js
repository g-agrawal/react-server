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
        let postList = posts.map(post => {
            return (
                <div className="post card" key={post.id}>
                    <div className="card-content">
                        <span className="card-title red-text">{post.title}</span>
                        <p>{post.body}</p>
                    </div>
                </div>
            )
        });
        return (
            <div className="home container">
                <h4 className="center">General Information</h4>
                {postList}
            </div>
        );
    }
}

export default Home;