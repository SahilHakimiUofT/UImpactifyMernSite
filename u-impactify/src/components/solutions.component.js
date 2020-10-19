import React, { Component } from 'react';
import Footer from './footer.component';
import NavBarHome from "./navbarhome.component";

export default class solutions extends Component{
    render(){
        return(
            <div className="homepage">
                <NavBarHome />
                <p>PlaceHolder</p>
                <Footer/>
            </div>
        )
    }
}