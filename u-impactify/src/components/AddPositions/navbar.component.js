import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { navbarItems } from '../SocialInitiative/socialInitNavbarItems';
import './positions.css';
import logo from '../../images/UImpactify-logo.png';

export default class Navbar extends Component {
    render() {
        return (
            <body>
                <div className='top-nav'>
                    <h1 className = "dashboard">Add Positions</h1>
                </div>
                <nav className='menu-pos'>
                    <ul className='menu-items'>
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