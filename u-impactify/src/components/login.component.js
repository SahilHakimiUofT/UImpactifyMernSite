import React, { Component } from 'react';

export default class login extends Component{
    render(){
        return(
            <div className="TitleHeader">
                <NavBarHome />
                <h1>About U-Impactify</h1>
                <br></br>
                <h2>What is U-IMPACTIFY?</h2>
                <br></br>
                <p>U-Impactify is an online learning platform that supports hybrid learning (online learning & offline meetups) models.
                    We are helping <br></br>impact specialists to create their best learning modules around social entrepreneurship and 21st-century skills. 
                    On the other side,<br></br>social ventures and intrapreneurs will be part of this curated and gamified learning supporrt group to grow and thrive.
                </p>
                <br></br>
                <br></br>
                <br></br>
                <h2>What are we aiming for?</h2>
                <h3>Social Initiatives</h3>
                <p>(Non-Profits, Charities, CSRs, Etc.)</p>
                    <ul>
                        <li>Helps students to gain new skills or knowledge to apply in their organization</li>
                        <li>Builds a learning community to share expertise and experience</li>
                    </ul>
                <br></br>
                <h3>Instructors</h3>
                <p></p>
                    <ul>
                        <li>Help instructors get more clients</li>
                        <li>Help instructors to create and manage their courses</li>
                    </ul>
                <br></br>
                <p>Get Started</p>
                <br></br>
                <p>Request and instant demo</p>
                <Footer />
            </div>
        )
    }
}