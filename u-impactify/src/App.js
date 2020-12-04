import React, {Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import homepage from "./components/Homepage/homepage.component";
import about from "./components/About/about.component";
import signup from './components/Signup/signup.component';
import login from './components/Login/login'
import Consultant from './components/Consultant/consultant'
import addcourse from './components/Consultant/addcourse.component'
import Learner from './components/Learner/learner'
import SocialInitiative from './components/SocialInitiative/socialInitDashboard';
import { AuthProvider, AuthContext } from './Auth';
import PrivateRoute from './PrivateRoute';
import { Test } from './components/test'
import Profile from './components/Profile/profile.component'
import Opportunities from './components/Opportunities/opportunities';
import OrgOpportunities from './components/OrgPositions/OrgOpportunities';
import allCourses from './components/Learner/AllCoursesView/AllCoursesList'
import AddPositions from './components/AddPositions/addPositions'
import InitiativeList from './components/InitiativeList/IniativeList';
import InitiativeDetails from './components/InitiativeDetails/InitiativeDetails';
import EditCourse from './components/Course/editCourse';
import Announcement from './components/Course/announcement';
import CourseDetail from './components/Learner/CourseDetailView/CourseDetail';
import allClasses from './components/Learner/MyClassesView/MyClassesList';
import AllPosts from './components/AllPosts/allposts'
import IndividualPost from './components/AllPosts/IndividualPost/IndividualPost';
import CoursePage from './components/Learner/MyClassesView/CoursePage'

const DashboardRoute = () => {
  const { userType } = React.useContext(AuthContext);
  let component = null;
  if (userType === 'learner') {
    component = Learner;
  } else if (userType === 'consultant') {
    component = Consultant;
  } else if(userType === 'organization'){
    component = SocialInitiative;
  }

  return (
    <PrivateRoute path="/dashboard" exact component={component} />
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
                        <Route path="/all-courses" exact component={allCourses} />
                        <PrivateRoute path="/all-courses/:courseid" exact component={CourseDetail} />
                        <PrivateRoute path="/addcourse" exact component={addcourse} />
                        <PrivateRoute path="/profile" exact component={Profile}/>
                        <PrivateRoute path="/editcourse/:courseid" exact component={EditCourse}/>
                        <PrivateRoute path="/announcement/:courseid" exact component={Announcement}/>
                        <Route path="/opportunities" exact component={Opportunities}/>
                        <PrivateRoute path="/forum" exact component={AllPosts}/>
                        <PrivateRoute path="/forum/:id" exact component={IndividualPost} />
                        <PrivateRoute path="/our-opportunities" exact component={OrgOpportunities}/>
                        <PrivateRoute path="/add_position" exact component={AddPositions}/>
                        <Route path="/initiatives" exact component={InitiativeList} />
                        <Route path="/initiatives/:id" exact component={InitiativeDetails} />
                        <PrivateRoute path="/my-classes" exact component={allClasses} />
                        <PrivateRoute path="/my-classes/:courseid" exact component={CoursePage} />
                        <DashboardRoute />
                    </div>
                </Router>
            </AuthProvider>
        );
    }
}
export default App;
