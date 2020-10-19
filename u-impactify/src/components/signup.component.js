import React, { Component } from 'react';
import styled from 'styled-components';
import NavBarHome from './navbarhome.component';
import Footer from './footer.component';

export default class signup extends Component{
    render(){
    return (
        <div className="main-signup">
            <NavBarHome />
            <div className="container">
            <div className="row">
            {/* Columns*/}
            <div className="col-md-5 col-sm-10">
                <h1>Join the movement,<br />change the World</h1>
            <ul className="list-unstyled">
            </ul>
            </div>
            <div className="col-md-5 col-sm-10">
                <h1>Create An Account</h1>
                <ul className="list-unstyled">
                    <li>Email</li>
                    <br />
                    <li>Username</li>
                    <br />
                    <li>Password</li>
                    <br />
                    <li>Are you Joining as a Student or Instructor?</li>
                    <p>Please select your answer below</p>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <ul className="list-unstyled">
                                    <p>Student</p>
                                </ul>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <ul className="list-unstyled">
                                    <p>Instructor</p>
                                </ul>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <ul className="list-unstyled">
                                    <p>Social Initiatives</p>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ul>
                <p>*By sharing your email, you agree to our Offer Terms, Terms of Service and Privacy Policy</p>
                <br/>
                <p>Sign Up</p>
            </div>
            </div>
            </div>
            <Footer />
        </div>
    )
    }
}