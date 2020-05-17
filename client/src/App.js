import React, { Component } from 'react';
import BootstrapNavbar from './componenets/BootstrapNavbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './componenets/Home';
import Refresh from './componenets/Refresh';
import Contact from './componenets/Contact';
import Post from './componenets/Post';

class App extends Component {
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
        </Switch>
      </div>
    </BrowserRouter>
   );
  }
}

export default App;
