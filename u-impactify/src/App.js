import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import homepage from "./components/homepage.component"
import about from "./components/about.component"
import signup from './components/signup.component';
import login from './components/login'
import Consultant from './components/consultant'
import Learner from './components/learner'
import { AuthProvider, AuthContext } from './Auth';
import PrivateRoute from './PrivateRoute';
import { Test } from './components/test'
import LearnerProfile from './components/Profile/learner-profile.component';
import ConsultantProfile from './components/Profile/consultant-profile.component';

const DashboardRoute = () => {
  const { userType } = React.useContext(AuthContext);
  let component = null;
  if (userType === 'learner') {
    component = Learner;
  } else if (userType === 'consultant') {
    component = Consultant;
  }

  return (
    <Route path="/dashboard" exact component={component} />
  )
}

class App extends Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <div className="App">
                        <PrivateRoute exact path='/homecc' component={Test} />
                        <Route path="/" exact component={homepage} />
                        <Route path="/about" exact component={about} />
                        <Route path="/signup" exact component={signup} />
                        <Route path="/login" exact component={login} />
                        <Route path="/profile-learner" exact component={LearnerProfile}/>
                        <Route path="/profile-consultant" exact component={ConsultantProfile}/>
                        <DashboardRoute />
                    </div>
                </Router>
            </AuthProvider>
        );
    }
}
export default App;
