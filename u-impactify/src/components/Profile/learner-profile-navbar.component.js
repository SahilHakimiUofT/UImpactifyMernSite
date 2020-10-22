import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { learnerItems } from '../learnerNavItems';
import './profile-navbar.css';
import logo from '../UImpactify-logo.png';

export default class LearnerProfileBar extends Component {
    render() {
        return (
            <body>
              <div className="nav">

              </div>
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