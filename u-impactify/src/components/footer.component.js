import React, { Component } from 'react';
import styled from 'styled-components';

export default class Footer extends Component{
    render(){
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
        <div className="container">
        <div className="row">
        {/* Columns*/}
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
        </FooterContainer>
    )
}
}

const FooterContainer = styled.footer`
.footer-middle {
    background: var(--mainDark);
    padding-top: 3rem;
    padding-bottom: 1rem;
    color: var(--mainWhite);
    bottom: 0px;
    position: relative;
    left: 0px;
    width: 100%
}
`;