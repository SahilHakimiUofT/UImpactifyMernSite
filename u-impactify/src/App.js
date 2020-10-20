import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarHome from "./components/navbarhome.component";
import homepage from "./components/homepage.component"
import about from "./components/about.component"
import solutions from "./components/solutions.component"
import pricing from "./components/pricing.component"
import Footer from './components/footer.component';
import signup from './components/signup.component';
import { render } from 'react-dom';
import firebase from './config/firebase';
import login from './components/login'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
        }
    }

    componentDidMount(){
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user){
                this.setState({ user });
                //localStorage.setItem('user', user.uid);
            } else {
                this.setState( {user: null });
                //localStorage.removeItem('user');
            }
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/" exact component={homepage} />
                    <Route path="/about" exact component={about} />
                    <Route path="/solutions" exact component={solutions} />
                    <Route path="/pricing" exact component={pricing} />
                    <Route path="/signup" exact component={signup} />
                    <Route path="/login" exact component={login} />
                </div>
                </Router>
        );
        }
}
export default App;