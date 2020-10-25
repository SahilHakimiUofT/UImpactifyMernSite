import React, { Component } from 'react';
import NavBarHome from '../HomeNavbar/navbarhome.component';
import Footer from '../Footer/footer.component';
import './homepage.css';
import home_photo from '../../images/homepage.png';
import garden from '../../images/garden.png';
import speclized from '../../images/specialized.png';
import resources from '../../images/resources.png';
import app from '../../config/firebase';

export default class homepage extends Component{
    componentDidMount(){
        app.auth().signOut()
    }
    
    render(){
        return(
            <div className="homepage">
                <NavBarHome />
                <div className="body">
                    <h1>An Online learning Platform for social entrepreneurs and intrapreneurs</h1>
                    <img src={home_photo} className='home_photo' alt=''></img>
                    <div className="starting">
                        <br />
                    <a href="/signup" className="start">Get Started</a>
                    <br/>
                    </div>
                    <p>Request and instant demo</p>
                    <br />
                    <div className="table">
                        <div className="container">
                        <div className="row">
                        <div className="col-md-3 col-sm-6">
                        <img src={speclized} className='photos_2' alt=''></img>
                        <h4>Specialized</h4>
                        <p></p>
                        <ul className="list-unstyled">
                            <li>Specialized in social entrepreneurs, non-profits, charities and sustainability movements</li>
                        </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                        <img src={garden} className='photos_2' alt=''></img>
                        <h4>The Giving Garden</h4>
                        <p></p>
                        <ul className="list-unstyled">
                            <li>We donate to your choice of charity on your behalf when you complete a course</li>
                        </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                        <img src={resources} className='photos_2' alt=''></img>
                            <h4>Resources</h4>
                            <p></p>
                            <ul className="list-unstyled">
                                <li>Consisting of coaching as well as online communities and offline meetups</li>
                            </ul>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="starting">
                            <a href="/about" className="start">Learn More About What U-Impactify Does</a>
                            <br/>
                        </div>
                </div>
                <br />
                <Footer />
            </div>
        )
    }
}