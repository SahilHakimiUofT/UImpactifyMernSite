import React, { Component } from 'react';
import NavBarHome from './navbarhome.component';
import Footer from './footer.component';
import './homepage.css';
import home_photo from '../images/homepage.png';
import garden from '../images/garden.png';
import speclized from '../images/specialized.png';
import resources from '../images/resources.png';

export default class homepage extends Component{
    render(){
        return(
            <div className="homepage">
                <NavBarHome />
                <div className="body">
                    <h1>An Online learning Platform for social entrepreneurs and intrapreneurs</h1>
                    <img src={home_photo} class='home_photo' alt=''></img>
                    <div class="starting">
                    <a href="/signup" class="start">Get Started</a>
                    <br/>
                    </div>
                    <p>Request and instant demo</p>
                    <br />
                    <div className="table">
                        <div className="container">
                        <div className="row">
                        <div className="col-md-3 col-sm-6">
                        <img src={speclized} class='photos_2' alt=''></img>
                        <h4>Specialized</h4>
                        <p></p>
                        <ul className="list-unstyled">
                            <li>Specialized in social entrepreneurs, non-profits, charities and sustainability movements</li>
                        </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                        <img src={garden} class='photos_2' alt=''></img>
                        <h4>The Giving Garden</h4>
                        <p></p>
                        <ul className="list-unstyled">
                            <li>We donate to your choice of charity on your behalf when you complete a course</li>
                        </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                        <img src={resources} class='photos_2' alt=''></img>
                            <h4>Resources</h4>
                            <p></p>
                            <ul className="list-unstyled">
                                <li>Consisting of coaching as well as online communities and offline meetups</li>
                            </ul>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div class="starting">
                            <a href="/about" class="start">Learn More About What U-Impactify Does</a>
                            <br/>
                        </div>
                </div>
                <br />
                <Footer />
            </div>
        )
    }
}