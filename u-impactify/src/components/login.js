import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from "react-router";
import app from "../config/firebase";
import { AuthContext } from "../Auth";
import Footer from './footer.component';
import NavBarHome from './navbarhome.component';
import login_photo from '../images/login_page.png';
import './login.css';

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
            <div className="container">
            <div className="row">
            {/* Columns*/}
            <div className="col-md-5 col-sm-10">
                <h1>A System you can rely on.</h1>
                <img src={login_photo} class='photo' alt=''></img>
            </div>
            <div className="col-md-5 col-sm-10">
                <div class="formsign">
                <h1>Welcome Back</h1>
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
                <button type="submit" class="loginbutton">Log In</button>
            </form>
            <br />
            <p>Don't have an account? <a href='/signup'>Sign Up</a></p>
                </div>
            </div>
            </div>
            </div>
            <br />
            <Footer />
        </div>
        </div>
    );
};

export default withRouter(Login);

