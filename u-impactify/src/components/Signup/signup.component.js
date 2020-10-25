import React, { useCallback } from 'react';
import NavBarHome from '../HomeNavbar/navbarhome.component';
import Footer from '../Footer/footer.component';
import app from "../../config/firebase"
import { withRouter } from 'react-router';
import singup_photo from '../../images/sign.png';
import './Signup.css';
import { AuthContext } from '../../Auth';


const SignUp = ( { history }) => {
    const { setUserType } = React.useContext(AuthContext);
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { _id, password, type, username, firstName, lastName } = event.target.elements;

        console.log(_id.value);
        console.log(type.value);
        setUserType(type.value);
        let databody = {
            "_id": _id.value,
            "userType": type.value,
            "email": _id.value,
            "username": username.value,
            "firstName": firstName.value,
            "lastName": lastName.value
        }

        console.log(databody);

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(_id.value, password.value);
            
            fetch('http://localhost:5000/users/add', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data));
            history.push("/dashboard");
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
                        <input name="_id" type="email" placeholder="Enter email" />
                    </label>
                    <br />
                    <label>
                        Password <br />
                        <input name="password" type="password" placeholder="Enter Password" />
                    </label>
                    <br />
                    <label>
                        Username <br />
                        <input name="username" type="text" placeholder="Enter Username" />
                    </label>
                    <br />
                    <label>
                        First Name <br />
                        <input name="firstName" type="text" placeholder="Enter First Name" />
                    </label>
                    <br />
                    <label>
                        Last Name <br />
                        <input name="lastName" type="text" placeholder="Enter Last Name" />
                    </label>
                    <br />
                    <label>
                        User Type <br />
                        <select name="type">
                            <option value={'learner'}>Impact Learner</option>
                            <option value={'consultant'}>Consultant</option>
                            <option value={'organization'}>Social Initiative</option>
                        </select>
                    </label>
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