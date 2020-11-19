import React, { Component } from 'react';
import Footer from '../Footer/footer.component';
import './consultant.css';
import * as CgIcons from 'react-icons/cg';
import { Link } from 'react-router-dom';
import add_course from '../../images/add-new-course.png';
import { navbarItems } from './navbarItems.js';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import logo from '../../images/UImpactify-logo.png';
import { Grid } from '@material-ui/core';
import Figure from 'react-bootstrap/Figure';
import FigureCaption from 'react-bootstrap/FigureCaption';
import EditCourse from '../Course/editCourse';
import { AuthContext } from '../../Auth';
import { GetRequest, PostRequest } from '../../helpers/httprequests'

export default class Consultant extends Component{
    constructor(props){
        super(props)
      this.state = {
          courses:[]
      }  
    }
    componentDidMount() {
        let userId = this.context.currentUser.email;
    
        GetRequest('courses/instructor/' + userId)
          .then(response => {
            console.log(response)
            this.setState({
              courses:response.data
            })
          })
          .catch(function(error) {
            console.log(error);
          })
      }
    render(){
    return (
        <div className = 'consultant-main'>
              <div className = 'consultant-content-wrap'>
              <div className='consultant-top-navbar'>
                <h1 className = "consultant-dashboard">Dashboard</h1>
                </div>
                
                <nav className='consultant-sidebar'>
                    <ul className='consultant-nav-menu-items'>
                        <li>
                            <img src={logo} className ='consultant-logo' alt="Logo" />
                        </li>
                        {navbarItems.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} className="ITEM">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )


                        })
                        }
                </ul>
                </nav>


                <h1 className = "consultant-calendar">Calendar</h1>  
                <h1 className = "consultant-classes">Your Classes</h1>
                <Grid container spacing={4} className = "consultant-course-list">
                  <Grid item xs={10}>
                    <Grid container justify="start" spacing={4}>
                      <Grid item>
                        <Figure>
                        <Figure.Image src = {add_course} className = "consultant-courseImg"/>
                        <FigureCaption className="figure-caption text-center"><Link to='/addcourse'>Add course</Link></FigureCaption>
                        </Figure>
                      </Grid>
                      {this.state.courses.map((course, index) => {
                            return (
                              <Grid key={course.name} item>
                                <Figure>
                                  
                                <Figure.Image src = {course.pictureUrl} className = "consultant-courseImg"/>
                                <FigureCaption className="figure-caption text-center"><Link to={`/editcourse/${encodeURIComponent(course._id)}`}>{course.name}</Link></FigureCaption>
                                </Figure>
                              </Grid>
                            )
                    })
                    }
                    
                    </Grid>
                  </Grid>
                </Grid>        
                
                
              
                <div className = 'Foot'>
                <Footer />
                </div>
          
                </div>
                </div>
    );

    }}
    Consultant.contextType = AuthContext;