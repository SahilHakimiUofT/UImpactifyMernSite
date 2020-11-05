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
        <Grid classname="body">
        <Grid container direction = "row" className="my-4">
            <Grid item>
                <Navbar />
            </Grid>
            <Grid xs container direction="column" className="form">
                <Grid item>
                    <AddPositionForm />
                </Grid>
            </Grid>
        </Grid>
        <Grid container direction="row" className="bottom">
            <Footer />
        </Grid>
        </Grid>
    )
}
