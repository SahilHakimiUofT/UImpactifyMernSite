import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBarHome extends Component {

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">U-Impactify</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/solutions" className="nav-link">Solutions</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/pricing" className="nav-link">Pricing</Link>
                        </li>
                        <li className="navbar-item-login">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item-signup">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}