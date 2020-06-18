import React, { Component } from 'react';
import { connect } from 'react-redux'
import socketIoClient from 'socket.io-client'
import BootstrapNavbar from './componenets/BootstrapNavbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './componenets/Home';
import Refresh from './componenets/Refresh';
import Contact from './componenets/Contact';
import Post from './componenets/Post';
import { deletePostSuccess, addPostSuccess } from './actions/postAction';

class App extends Component {
  componentDidMount() {
    const socket = socketIoClient('/');
    socket.on('postAdded', data => {
      this.props.onAddUpdatePost(data);           
    });
    socket.on('postUpdated', data => {
      this.props.onAddUpdatePost(data);             
    });
    socket.on('postDeleted', data => {
      this.props.onDeletePost(data._id);
    });
  }
  render() {
  return (
    <BrowserRouter>
      <div className="App">
        <BootstrapNavbar />
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route exact path ='/Refresh' component={Refresh} />
          <Route exact path ='/Contact' component={Contact} />
          <Route exact path ='/Post' component={Post} />  
          <Route exact path ='/Post/:postId' component={Post} />
        </Switch>
      </div>
    </BrowserRouter>
   );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onDeletePost: _id => {
          dispatch(deletePostSuccess(_id));
      },
      onAddUpdatePost: post => {
          dispatch(addPostSuccess(post));
      }
  };
};

export default connect(null, mapDispatchToProps)(App);
