import React, { Component } from 'react';
import app from '../config/firebase';

export default class LogOutButton extends Component{
    render(){
        return(
            <div className="lbutton">
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
}