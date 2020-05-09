import React from 'react'
import { BrowserRouter, Switch, Route, Link  } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import Home from './Home'
import About from './About';
import Contact from './Contact';

class BootstrapNavbar extends React.Component{
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <BrowserRouter>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand>
                                    <Nav className="mr-auto">
                                        <Nav.Link as={Link} to="/">Open Sky</Nav.Link>
                                    </Nav>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                                        <Nav.Link as={Link} to="/About" >About</Nav.Link>
                                        <Nav.Link as={Link} to="/Contact" >Contact</Nav.Link>
                                    </Nav>
                                    <Form inline>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" size="sm"/>
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/About" component={About} />
                                <Route path="/Contact" component={Contact} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;