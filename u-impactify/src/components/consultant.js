import React, { Component } from 'react';
import Navbar from './navbar.component.js';
import Footer from './footer.component';
import './consultant.css';
import * as CgIcons from 'react-icons/cg';
import { Link } from 'react-router-dom';
export default class Consultant extends Component{
    render(){
    return (
        <div className = 'main'>
              <div className = 'content-wrap'>
              <div className='top-navbar'>
                <h1 className = "dashboard">Dashboard</h1>
                
                <CgIcons.CgProfile size={50} className = 'profile-pic'/>
               <Link to='./profile' className="profile-link"><h3 >Profile</h3></Link>
                </div>

                <Navbar />
                <div className = 'Foot'>
                <Footer />
                </div>
          
                </div>
                </div>
    );

    }}