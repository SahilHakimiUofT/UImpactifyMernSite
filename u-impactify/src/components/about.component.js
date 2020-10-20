import React, { Component } from 'react';
import NavBarHome from './navbarhome.component';
import Footer from './footer.component';

export default class login extends Component{
    render(){
        return(
            <div className="TitleHeader">
                <NavBarHome />
                <h1>About U-Impactify</h1>
                <br></br>
                <div className="middle">
                <h2>What is U-IMPACTIFY?</h2>
                <br></br>
                <p>U-Impactify is an online learning platform that supports hybrid learning (online learning & offline meetups) models.
                    We are helping <br></br>impact specialists to create their best learning modules around social entrepreneurship and 21st-century skills. 
                    On the other side,<br></br>social ventures and intrapreneurs will be part of this curated and gamified learning supporrt group to grow and thrive.
                </p>
                </div>
                <h2>What are we aiming for?</h2>
                <div className="second">
                    <div className="col-md-2 col-sm-2">
                    <h4>Social Initiatives</h4>
                    <p>(Non-Profits, Charities, CSRs, Etc.)</p>
                    <ul className="list-unstyled">
                        <li>Helps students to gain new skills or knowledge to apply in their organization</li>
                        <li>Builds a learning community to share expertise and experience</li>
                    </ul>
                    </div>
                    <div className="col-md-2 col-sm-2">
                    <h4>Instructors</h4>
                    <p></p>
                    <ul className="list-unstyled">
                            <li>Help instructors get more clients</li>
                            <li>Help instructors to create and manage their courses</li>
                    </ul>
                    </div>
                </div>
                <p>Get Started</p>
                <br></br>
                <p>Request and instant demo</p>
                <p>U-Impactify is an online learning platform that supports hybrid learning (online learning & offline meetups) models.
                    We are helping <br></br>impact specialists to create their best learning modules around social entrepreneurship and 21st-century skills. 
                    On the other side,<br></br>social ventures and intrapreneurs will be part of this curated and gamified learning supporrt group to grow and thrive.
                </p>
                <Footer />
            </div>
        )
    }
}