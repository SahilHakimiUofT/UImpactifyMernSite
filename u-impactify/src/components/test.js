import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import LogOutButton from './LogoutButton/logout_button.component';
import Footer from './Footer/footer.component';

export function Test(){
    const {currentUser} = useContext(AuthContext);

    return(
        <div>
            <h2>welcome</h2> 
            <p>{currentUser.email}</p>
            <LogOutButton />
                <Footer />
        </div>
    )
}