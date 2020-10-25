import React, { Component } from 'react';
import Navbar from './socialInitNavbar.component.js';
import Footer from '../Footer/footer.component';
import './socialInitDashboard.css';
export default class SocialInitiativeDashboard extends Component{
    render(){
    return (
        <div className = 'lmain'>
            <Navbar />
            <div className = 'footer'>
                 <Footer />
            </div>
        </div>
    );

    }}