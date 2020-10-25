import React, { Component } from 'react';
import './footer.css';
import logo from '../../images/UImpactify-logo.png';

export default class Footer extends Component{
    render(){
    return (
        <footer className='footer-bottom'>
            <div className="footer-middle">
        <div className="container">
        <div className="row">
        {/* Columns*/}
        <div className="col-md-2 col-sm-5">
        <img src={logo} class='photo_logo' alt=''></img> 
        </div>
        <div className="col-md-2 col-sm-5">
            <ul className="list-unstyled"> 
                <li>(email address)</li>
                <li>(phone number)</li>
                <li>(address)</li>
            </ul>
        </div>
        <div className="col-md-2 col-sm-5">
            <h4>Product</h4>
            <ul className="list-unstyled">
                <li>Help Center</li>
                <li>Platform</li>
                <li>Accessibility</li>
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="col-md-2 col-sm-5">
            <h4>Use Cases</h4>
            <ul className="list-unstyled">
                <li>Non-Profits</li>
                <li>Governments</li>
                <li>Social Enterprises</li>
                <li>Charities</li>
            </ul>
        </div>
        <div className="col-md-2 col-sm-5">
            <h4>About</h4>
            <ul className="list-unstyled">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Blog</li>
                <li>FAQ</li>
            </ul>
        </div>
        <div className="col-md-2 col-sm-5">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Linkedin</li>
            </ul>
            <h4>Language</h4>
            <p>English</p>
        </div>
        </div>
        </div>
        </div>
        </footer>
    )
}
}
