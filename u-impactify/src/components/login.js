import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from "react-router";
import app from "../config/firebase";
import { AuthContext } from "../Auth";
import Footer from './footer.component';
import NavBarHome from './navbarhome.component';

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/homecc");
            }
            catch (error) {
                alert(error); 
            }
        }, [history]
    );

    const { currentUser } = useContext(AuthContext);
    if (currentUser)
    {
        return <Redirect to="/homecc" />
    }

    return (
        <div>
            <NavBarHome />
            <div class="mainbody">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email <br />
                    <input name="email" type="email" />
                </label>
                <br />
                <label>
                    Password <br />
                    <input name="password" type="password" />
                </label>
                <br />
                <button type="submit">Log In</button>
            </form>
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default withRouter(Login);

