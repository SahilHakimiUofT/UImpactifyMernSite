import React, { Component } from 'react';
import Footer from '../Footer/footer.component';
import './consultant.css';
import * as CgIcons from 'react-icons/cg';
import { Link } from 'react-router-dom';
import add_course from '../../images/add-new-course.png';
import { navbarItems } from './navbarItems.js';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import logo from '../../images/UImpactify-logo.png';


export default class Consultant extends Component{
    render(){
    return (
        <div className = 'main'>
              <div className = 'content-wrap'>
              <div className='top-navbar'>
                <h1 className = "dashboard">Dashboard</h1>
                </div>
                
                <nav className='sidebar'>
                    <ul className='nav-menu-items'>
                        <li>
                            <img src={logo} className ='logo' alt="Logo" />
                        </li>
                        {navbarItems.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} className="ITEM">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )


                        })
                        }
                </ul>
                </nav>


                <h1 className = "calendar">Calendar</h1>  
                <h1 className = "classes">Your Classes</h1>
                <Link to='/addcourse'><img className = 'add-course' src = {add_course}/></Link>
                
                
              
                <div className = 'Foot'>
                <Footer />
                </div>
          
                </div>
                </div>
    );

    }}