import React, { Component } from 'react';
import Footer from './footer.component';
import LogOutButton from './logout_button.component';



export default class homecc extends Component{
    render(){
        return(
            <div className="homecc">
                <p>Welcome CC</p>
                <LogOutButton />
                <Footer />
            </div>
        )
    }
}