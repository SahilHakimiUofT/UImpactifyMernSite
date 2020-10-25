import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { learnerItems } from '../Learner/learnerNavItems';
import { navbarItems } from '../Consultant/navbarItems';
import './profile-navbar.css';
import logo from '../../images/UImpactify-logo.png';
import { AuthContext } from '../../Auth';

export default class ProfileBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    this.setState({items: this.context.userType === "learner" ? learnerItems : navbarItems})
  }

  render() {
    return (
      <body>
      <div className="my-nav"></div>
        <nav className='nav-menu'>
            <ul className='nav-menu-items'>
                <li>
                    <img src={logo} className ='logo' alt="Logo" />
                </li>
                {this.state.items.map((item, index) => {
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

ProfileBar.contextType = AuthContext