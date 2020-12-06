import React, { useContext, useCallback, Component } from "react";
import { AuthContext } from "../../Auth";
import Footer from '../Footer/footer.component';
import Navbar from './navbar.component';
import { withRouter, Redirect } from "react-router";
import { useHistory } from 'react-router-dom';
import { AddPositionForm } from './AddPositionForm';
import './positions.css';
import { Grid } from '@material-ui/core'


export default function AddPositions(){
    const {currentUser} = useContext(AuthContext);
    const { setUserType } = React.useContext(AuthContext);

    return(
        <div className="main">
            <div className="content-wrap">
            <div className='top-nav'>
              <h1 className = "dashboard">Add Positions</h1>
            </div>
              <Grid container direction="row">
                <Grid item>
                  <Navbar/>
                </Grid>
                <Grid xs container direction="row">
                <Grid item>
                    <div className="addposform">
                        <AddPositionForm />
                    </div>
                </Grid>
                </Grid>
              </Grid>
              <Footer/>
            </div>
          </div>
    )
}
