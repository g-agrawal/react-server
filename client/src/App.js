import React, { Component } from 'react';
import BootstrapNavbar from './componenets/BootstrapNavbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './componenets/Home';
import About from './componenets/About';
import Contact from './componenets/Contact';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <div className="App">
        <BootstrapNavbar />
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route exact path ='/About' component={About} />
          <Route exact path ='/Contact' component={Contact} />
        </Switch>
      </div>
    </BrowserRouter>
   );
  }
}

export default App;
