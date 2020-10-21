import React, { Component } from 'react';
import LearnerBar from './learnerNav.component.js';
import Footer from './footer.component';
import './learner.css';
export default class Learner extends Component{
    render(){
    return (
        <div className = 'lmain'>
            <LearnerBar />
            <div className = 'footer'>
                 <Footer />
            </div>
        </div>
    );

    }}