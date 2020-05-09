import React from 'react'
import { Link  } from "react-router-dom";

class BootstrapNavbar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Open Sky</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li> 
                        <li className="nav-item">
                            <Link to="/About" className="nav-link">About</Link>
                        </li>  
                        <li className="nav-item">
                            <Link to="/Contact" className="nav-link">Contact</Link>
                        </li>                     
                    </ul>
                </div>
            </nav>
        );     
    }
}

export default BootstrapNavbar;