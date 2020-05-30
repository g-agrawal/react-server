------------ How to add new Url, create and deploy app from Git repository ---------------
1. heroku create appName
2. Got to heroku dashboard and open appName
3. Select deploy using Git repository and search your git repo and enable auto deploy
4. Select deploy master branch 
5. Got to appName.herokuapp.com
------------------------------------------------------------------------------------------
_______________________________________________________________________________
Use this for dropdown items in menunavigation bar
<Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" >Home</Nav.Link>
        <Nav.Link as={Link} to="/About" >About</Nav.Link>
        <Nav.Link as={Link} to="/Contact" >Contact</Nav.Link>
    <Nav.Link href="/">Home</Nav.Link>
    <Nav.Link href="/About">About</Nav.Link>
    <Nav.Link href="/Contact">Contact</Nav.Link>
    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown> 
    </Nav>
    <Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-success">Search</Button>
    </Form>
</Navbar.Collapse>
_________________________________________________________________________________
