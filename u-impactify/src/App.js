import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import homepage from "./components/homepage.component"
import about from "./components/about.component"
import signup from './components/signup.component';
import login from './components/login'
import Consultant from './components/consultant'
import Learner from './components/learner'
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
                        <Route path="/signup" exact component={signup} />
                        <Route path="/login" exact component={login} />
                        <Route path="/consultant" exact component={Consultant} />
                        <Route path="/learner" exact component={Learner} />
                    </div>
                </Router>
            </AuthProvider>
        );
    }
}
export default App;
