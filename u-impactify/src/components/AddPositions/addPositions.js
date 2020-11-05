import React, { useContext, useCallback, Component } from "react";
import { AuthContext } from "../../Auth";
import Footer from '../Footer/footer.component';
import Navbar from '../SocialInitiative/socialInitNavbar.component';
import { Redirect } from "react-router";
import { withRouter } from 'react-router';
import { AddPositionForm } from './AddPositionForm';
import './positions.css';


export function AddPositions(){
    const {currentUser} = useContext(AuthContext);
    const { setUserType } = React.useContext(AuthContext);

    
    return(
        <div>
            <div className='top-nav'>
                <h1 className="dashboard"><a href='/settings'>Settings</a></h1>
            </div>
            <div>
                    <div className="form">
                            <AddPositionForm /> 
                            <br />  
                        </div>       
            </div>
            <div>
                <Footer />
            </div>   
        </div>
    )
}