import React, { Component } from 'react';
import Navbar from './navbar.component.js';
import Footer from './footer.component';
import './consultant.css';
export default class Consultant extends Component{
    render(){
    return (
        <div className = 'main'>
              <div className = 'content-wrap'>
                <Navbar />
                <div className = 'Foot'>
                <Footer />
                </div>
          
                </div>
                </div>
    );

    }}