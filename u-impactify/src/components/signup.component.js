import React, { useCallback } from 'react';
import NavBarHome from './navbarhome.component';
import Footer from './footer.component';
import app from "../config/firebase"
import { withRouter } from 'react-router';
import singup_photo from '../images/sign.png';
import './Signup.css';


const SignUp = ( { history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/homecc");
        } catch (error)
        {
            alert(error);
        }
    }, [history] );

    return (
        <div className="main-signup">
            <NavBarHome />
            <div className="container">
            <div className="row">
            {/* Columns*/}
            <div className="col-md-5 col-sm-10">
                <h1>Join the movement,<br />change the World.</h1>
                <img src={singup_photo} class='photo' alt=''></img>
            </div>
            <div className="col-md-5 col-sm-10">
                <div class="formsign">
                <h1>Create An Account</h1>
                <form onSubmit={handleSignUp}>
                    <label>
                        Email <br />
                        <input name="email" type="email" placeholder="" />
                    </label>
                    <br />
                    <label>
                        Password <br />
                        <input name="password" type="password" placeholder="password" />
                    </label>
                    <br />
                    <p>Already have an account? <a href='/login'>Login</a></p>
                    <button type="submit" class='singupbutton'>SIGN UP</button>
                </form>
                </div>
            </div>
            </div>
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default withRouter(SignUp);