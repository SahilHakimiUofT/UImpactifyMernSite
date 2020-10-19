import React, { Component } from 'react';
import NavBarHome from './navbarhome.component';
import Footer from './footer.component';

export default class homepage extends Component{
    render(){
        return(
            <div className="homepage">
                <NavBarHome />
                <p>What is U-Impactify</p>
                <h1>An Online learning Platform for social entrepreneurs and intrapreneurs</h1>
                
                <Footer />
            </div>
        )
    }
}