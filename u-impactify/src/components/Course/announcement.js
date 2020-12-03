import React, { Component } from 'react';
import Footer from '../Footer/footer.component';
import { GetRequest, PostRequest, PatchRequest } from '../../helpers/httprequests'
import { AuthContext } from '../../Auth';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { navbarItems } from '../Consultant/navbarItems.js';
import logo from '../../images/UImpactify-logo.png';
import { Link } from 'react-router-dom';
import moment from 'moment';
import emailjs from "emailjs-com";
import './announcement.css';


export default class Announcement extends Component{
    constructor(props){
        super(props);
        this.state = {     
        emails:"",
        courseName:""
          }
    }
    
   
    setStudent(response){
      var allStudents = response.data;
      var studentsTemp = ""
            for(var i = 0; i<allStudents.length;i++){
                for(var j = 0; j<allStudents[i].enrollCourse.length;j++){
                    if(allStudents[i].enrollCourse[j].courseId == this.props.match.params.courseid){
                       studentsTemp = studentsTemp+ allStudents[i]._id + ","
                       break;
                    }
                }
            }

            console.log(studentsTemp)
            this.setState({emails:studentsTemp})

    }
    componentDidMount(){
      
      GetRequest('users/')
      .then(response => {this.setStudent(response)
       
      })
          
      GetRequest('courses/'+this.props.match.params.courseid)
      .then(res => {this.setState({name:res.data.name,})})
            
    }

   sendEmail(e){
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_w135mcd', e.target, 'user_P3Pse97JYgNlwBJUQwMTX')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
    }

    render(){
        return (
          <div className = 'main'>
          <div className = 'content-wrap'>
            <div className='top-navbar'>
                <h1 className = "dashboard">Announcement</h1>
            </div>
            
                <nav className='sidebar'>
                    <ul className='nav-menu-items'>
                        <li>
                            <img src={logo} className ='logo' alt="Logo" />
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
            <form onSubmit = {this.sendEmail} id = 'course-form'className = 'adding'>
              <div className='form-group'>
              <label htmlFor="announcement" className = 'announcement-label'>Announcement: </label>
              <br></br>
             
              <textarea rows = "5" className = "announcement-input" name = "anouncement"/> 
              <br></br>

              <input type = "hidden" value = {this.state.name} name = "course_name"/>
              <input type = "hidden" value = {this.state.emails} name = "emails"/>
              <input type = "submit" className ="btn btn-lg btn-primary"/>
              
              </div>
            </form>
            <div className = 'Foot'>
              <Footer />
               </div>        



</div>
</div> 
           

        );
    }


}

Announcement.contextType = AuthContext;