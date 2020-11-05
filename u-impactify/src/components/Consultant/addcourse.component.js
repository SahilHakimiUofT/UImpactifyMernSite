import React, { Component} from 'react';
import Footer from '../Footer/footer.component';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { navbarItems } from './navbarItems.js';
import logo from '../../images/UImpactify-logo.png';
import placeholder from '../../images/placeholder.png';
import './addcourse-style.css';
import { GetRequest, PostRequest } from '../../helpers/httprequests'
import {
    IMGUR_CLIENT_ID,
    DEFAULT_COURSE_PIC,
  } from "../../helpers/constants";
import { AuthContext } from '../../Auth';
import { get } from 'jquery';
  
export default class AddCourse extends Component{
   
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.updateCourseName = this.updateCourseName.bind(this)
        this.updateCourseId = this.updateCourseId.bind(this)
        this.updateStartDate = this.updateStartDate.bind(this)
        this.updateEndDate = this.updateEndDate.bind(this)
        this.updatePreqs = this.updatePreqs.bind(this)
        this.updatePreqsFor = this.updatePreqsFor.bind(this)
        this.updateDiffuculty = this.updateDiffuculty.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editImage = this.editImage.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.updateCourseDescription=this.updateCourseDescription.bind(this)
        this.updateDatabase=this.updateDatabase.bind(this)
        this.state = {
          courseId: '',
          courseName:'',
          courseDescription:'',
          startDate:new Date(),
          endDate:new Date(),
          prereqs:[],
          preqsfor:[],
          diffuculty:'',
          outline:[{topic: '',lessonNumber:''}],   
          imageUrl: DEFAULT_COURSE_PIC,
          topics:[],
          instructorName:''
        }
      }

    updateCourseName(e){
        this.setState({courseName:e.target.value})
    }

    updateCourseId(e){
        this.setState({courseId:e.target.value})
    }
    updateStartDate(e){
        this.setState({startDate:e.target.value})
    }
    updateEndDate(e){
        this.setState({endDate:e.target.value})
    }
    updatePreqs(e){
        this.setState({prereqs:e.target.value.split(',')})
    }
    updatePreqsFor(e){
        this.setState({preqsfor:e.target.value.split(',')})
    }
    updateDiffuculty(e){
        this.setState({diffuculty:e.target.value})
    }

    updateCourseDescription(e){
        this.setState({courseDescription:e.target.value})
    }
   
   
    
    cancelCourse = () => { 
        document.getElementById("course-form").reset();
        this.setState({imageUrl:DEFAULT_COURSE_PIC})
        this.setState({topics:[]})
      }

    addTopic(){
        this.setState({topics:[...this.state.topics,""]})
    }
    handleChange(e,index){
        this.state.topics[index] = e.target.value
        this.setState({topics:this.state.topics})
        
        var outline_week = {"topic":this.state.topics[index],'lessonNumber':index+1}
        
        this.state.outline[index] = outline_week
        console.log(this.state.outline,"$$$$")
    }
    
    handleRemove(index){

        this.state.topics.splice(index,1)
        this.state.outline.splice(index,1)
        console.log(this.state.outline,"$$$$")
        this.setState({topics: this.state.topics})
        this.setState({outline:this.state.outline})
    }

    editImage(image) {
        if (image) {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);
    
          var formdata = new FormData();
          formdata.append("image", image);
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
    
          fetch("https://api.imgur.com/3/image", requestOptions)
            .then(response => response.json())
            .then(result => {
              this.setState({ imageUrl: result.data.link});
            })
            .catch(error => console.log('error', error));
        }
      };
    
      deleteImage() {
        this.setState({ imageUrl: DEFAULT_COURSE_PIC });
      };

      updateDatabase() {
        const course = {
            _id: this.state.courseId,
            name: this.state.courseName,
            description: this.state.courseDescription,
            outline:this.state.outline,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            preReq: this.state.prereqs,
            preReqFor: this.state.preqsfor,
            difficultyLevel: this.state.diffuculty,
            pictureUrl: this.state.imageUrl,
            instructor: this.state.instructorName
        }
        
        
    
        PostRequest('courses/add', course)
          .then(res => console.log(res.data))
      
        this.cancelCourse()
        }



    handleSubmit(e){

        console.log(this.state,"$$$$")
    }

    componentDidMount(){
        var userId = this.context.currentUser.email
        GetRequest('users/'+userId)
        .then(res => {this.setState({instructorName:res.data.firstName + ' ' + res.data.lastName})

        })
    }
    render(){
        const {courseImg} = this.state
        let {topics} = this.state
    return (
     
        <div className = 'main'>
              <div className = 'content-wrap'>
                <div className='top-navbar'>
                    <h1 className = "dashboard">Add Course</h1>
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

                        <form id = 'course-form'className = 'adding'>
                            <div className='form-group'>
                                <label htmlFor="courseName" className = 'add-course-name'>Course Name: </label>
                            <input onChange = {this.updateCourseName} type="text" className="form-control" id="courseName" name ="courseName" aria-describedby="emailHelp" placeholder="Enter Course"></input>

                            <label htmlFor="courseId" className = 'add-course-id'>Course Id: </label>
                            <input onChange={this.updateCourseId} type="text" className="form-control" id="courseId" name ="courseId" aria-describedby="emailHelp" placeholder="Enter Course Id: "></input> 

                             <label htmlFor="courseDescription" className = 'add-course-des'>Course Description: </label>
                            <input onChange={this.updateCourseDescription} type="text" className="form-control" id="courseDescription" name ="courseDescription" aria-describedby="emailHelp" placeholder="Enter Course Description: "></input>  
    
                            <div className = 'course-dates'>
                            <label htmlFor="start">Start date: </label>

                            <input onChange={this.updateStartDate} type="date" id="start" name ="start" className = 'date-of-course'></input>
                            <label htmlFor="end" className = 'end-label'>End Date:  </label>

                            <input onChange={this.updateEndDate} type="date" id="end" name = "end" className = 'date-of-course'></input>
                            </div>
                            <br></br>
                            <div className = 'course-prereq'>
                                <label htmlFor="coursePrereq" >Pre-Requisite(s) (seperate by comma) </label>
                                <input onChange={this.updatePreqs} type="text" className="form-control" id="coursePrereq" name ="coursePrereq" aria-describedby="emailHelp" placeholder="If there are any pre-requisite(s) for the course, enter them here"></input>  
                                </div>

                                <div className = 'prereq-for'>
                                <label htmlFor="prereqs-for" >Pre-Requisite for (seperate by comma) </label>
                                <input onChange={this.updatePreqsFor} type="text" className="form-control" id="prereqs-for" name = "prereqs-for" aria-describedby="emailHelp" placeholder="If this course is a pre-requisite for any course, enter them here"></input>  
                            </div>
    
                            <div className ='diffuculty-level'>
                                <label htmlFor="exampleFormControlSelect1">Diffuculty Level</label>
                                <select onChange={this.updateDiffuculty} className="form-control" id="exampleFormControlSelect1">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div className = 'courseImage'>

                            <input type="file" id="BtnBrowseHidden" style={{ display: "none" }} onChange={(e) => this.editImage(e.target.files[0])}/>
                <label htmlFor="BtnBrowseHidden" id = "edit-course-pic"className="btn btn-success">Edit</label>
                <button type = "button" className="btn btn-danger" onClick={this.deleteImage}>
                  Delete
                </button>


                               
                                <br/>
                                <img className="course-image"src={this.state.imageUrl ||DEFAULT_COURSE_PIC} alt=""/>
                            </div>

                            <div className = 'courseOutline'>
                            <h1 className = 'outlineHeader'>Course Outline</h1>
                            <p>What are the topics in this course?</p>


                            <button onClick = {(e)=>this.addTopic(e) }type="button" className="btn btn-lg btn-primary">Add Topic</button>
                            {
                                this.state.topics.map((topic,index)=>{
                                    return(
                                        <div key={index}>
                                        <label htmlFor = {index}>Week #{index+1}</label>   
                                        <input type = "text" onChange ={(e)=>this.handleChange(e,index)} name = {index} className = "topicIn"/>
                                        <button onClick = {(e)=>this.handleRemove(index)} type="button" className="btn btn-dark btn-sm">Remove</button>
                                            </div>


                                    )
                                }
                                )
                            }
                            <br/>

                            <button type = "button" onClick = {this.updateDatabase} id = "submitButton" className="btn btn-lg btn-primary">Submit</button>




                            <button type="button" id = "discardButton" className="btn btn-lg btn-primary" onClick = {this.cancelCourse}>Discard</button>

                                </div>
                                            </div>
                                        </form>
                                            
                                            
                                            
                                            
                                            
                                        
                                            <div className = 'Foot'>
                                            <Footer />
                                            </div>
                                    
                                            
                                            
                                            
                                            </div>
                                            </div>


    );
    }}

    AddCourse.contextType = AuthContext;