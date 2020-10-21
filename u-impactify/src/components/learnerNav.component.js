import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { learnerItems } from './learnerNavItems.js';
import './LearnerNavbar.css';
import logo from './UImpactify-logo.png';

export default class LearnerBar extends Component {
    render() {
        return (
            <body>
                <div className='top-nav'>
                    <h1 className = "dashboard">Dashboard</h1>
                </div>
                <h1 className = "calendar">Calendar</h1>
                <h1 className = "announcements">Announcements</h1>
                <h1 className = "classes">Your Classes</h1>
                <h1 className = "courses">Suggested Courses</h1>
                <nav className='menu'>
                    <ul className='menu-items'>
                        <li>
                            <img src={logo} className ='logo' alt="Logo" />
                        </li>
                        {learnerItems.map((item, index) => {
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