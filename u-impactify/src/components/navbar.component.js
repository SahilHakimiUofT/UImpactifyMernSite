import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import { navbarItems } from './navbarItems.js';
import './Navbar.css';
import logo from './UImpactify-logo.png';

export default class Navbar extends Component {
    render() {
        return (
            <body>
                <div className='top-navbar'>
                <h1 className = "dashboard">Dashboard</h1>
                <CgIcons.CgProfile size={50} className = 'profile-pic'/>
               <Link to='./profile' className="profile-link"><h3 >Profile</h3></Link>
                </div>


                <h1 className = "calendar">Calendar</h1>  
                <h1 className = "classes">Your Classes</h1>
                

                <nav className='nav-menu'>
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
            </body>
        );


    }
}
