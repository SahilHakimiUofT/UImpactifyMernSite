import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import homepage from "./components/homepage.component"
import about from "./components/about.component"
import solutions from "./components/solutions.component"
import pricing from "./components/pricing.component"
import signup from './components/signup.component';
import login from './components/login'
import homecc from './components/homecc'
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

class App extends Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <div className="App">
                        <PrivateRoute exact path='/homecc' component={homecc} />
                        <Route path="/" exact component={homepage} />
                        <Route path="/about" exact component={about} />
                        <Route path="/solutions" exact component={solutions} />
                        <Route path="/pricing" exact component={pricing} />
                        <Route path="/signup" exact component={signup} />
                        <Route path="/login" exact component={login} />
                    </div>
                </Router>
            </AuthProvider>
        );
        }
}
export default App;