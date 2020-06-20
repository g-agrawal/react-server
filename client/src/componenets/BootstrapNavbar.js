import React from 'react'
import { Link  } from "react-router-dom";
import { connect } from 'react-redux'
import { searchPostSuccess } from '../actions/postAction';

class BootstrapNavbar extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchText = formData.get('searchPost');
        this.props.onSearchPost(searchText);
    }
    handleClear = () => {
        this.props.onSearchPost('');  
        this.searchFormRef.reset();     
    }
    render(){
        return(
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-conten-sm-start fixed-top">
                <a className="navbar-brand order-1 order-lg-0 ml-lg-0 ml-2 mr-lg-2 mr-auto" href="/">Open Blue Sky</a>
                <button className="navbar-toggler align-self-start" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>                
                <div className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark p-3 p-lg-0 mt-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto align-self-stretch">
                        {/* remove mr-auto to make menu item on right */}
                        <li className="subitem-width-auto nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li> 
                        <li className="subitem-width-auto  nav-item">
                            <Link to="/Post" className="nav-link">Post</Link>
                        </li>
                        {/* <li className="subitem-width-auto  nav-item">
                            <Link to="/Refresh" className="nav-link">Refresh</Link>
                        </li>   */}
                        <li className="subitem-width-auto  nav-item">
                            <Link to="/Contact" className="nav-link">Contact</Link>
                        </li>                         
                    </ul>
                    <form className="form-inline my-2 my-lg-0" ref={(formRef) => this.searchFormRef = formRef} onSubmit={this.handleSubmit}>
                        {/* input className=form-control-sm and button className=btn-sm, for smaller search control */}
                        <input className="form-control-sm mr-sm-2" type="search" name="searchPost" placeholder="Search" aria-label="Search"></input>
                        <button className="nav-link btn btn-outline-success btn-sm my-2 my-sm-0" type="submit">Search</button>
                        <button className="nav-link btn btn-outline-success btn-sm my-2 ml-2 my-sm-0" type='button' onClick={this.handleClear}>Clear</button>
                    </form>
                </div>
            </nav>
            <div className="overlay"></div>
            </div>
        );     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchPost: searchText => {
            dispatch(searchPostSuccess(searchText));
        }
    };
  };

export default connect(null, mapDispatchToProps)(BootstrapNavbar);