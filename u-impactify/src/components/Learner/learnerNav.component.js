import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { learnerItems } from './learnerNavItems.js';
import './LearnerNavbar.css';
import logo from '../../images/UImpactify-logo.png';
import ProfileBar from '../Profile/profile-navbar.component'
import { Grid } from '@material-ui/core'

export default class LearnerBar extends Component {
    render() {
        return (
            <Grid container direction = "row" className="my-4">
                <Grid item>
                    <ProfileBar/>
                </Grid>
                <Grid xs container direction="column">
                    <Grid item>
                        <div className='top-navv'>
                            <h1 className="dashboard">Dashboard</h1>
                        </div>
                    </Grid>
                </Grid>    
                <Grid>
                    <h1 className = "calendar">Calendar</h1>
                    <h1 className = "announcements">Announcements</h1>
                    <h1 className = "classes">Your Classes</h1>
                    <h1 className = "courses">Suggested Courses</h1>
                </Grid>
            </Grid>  
        );
    }
}