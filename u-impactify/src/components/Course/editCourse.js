
import React, { Component } from 'react';
import Footer from '../Footer/footer.component';
import { GetRequest, PostRequest, PatchRequest } from '../../helpers/httprequests'
import { AuthContext } from '../../Auth';
import {
    IMGUR_CLIENT_ID,
    DEFAULT_COURSE_PIC,
  } from "../../helpers/constants";
  import * as FaIcons from 'react-icons/fa';
  import * as AiIcons from 'react-icons/ai';
  import { navbarItems } from '../Consultant/navbarItems.js';
  import logo from '../../images/UImpactify-logo.png';
  import { Link } from 'react-router-dom';
  import moment from 'moment';
  import './editCourse.css';
  

export default class EditCourse extends Component{
    constructor(props){
        super(props);
        this.updateCourseName = this.updateCourseName.bind(this)
        this.updateStartDate = this.updateStartDate.bind(this)
        this.updateStartDate = this.updateStartDate.bind(this)
        this.updateEndDate = this.updateEndDate.bind(this)
        this.updatePreqs = this.updatePreqs.bind(this)
        this.updatePreqsFor = this.updatePreqsFor.bind(this)
        this.updateDiffuculty = this.updateDiffuculty.bind(this)
        this.updateCourseDescription=this.updateCourseDescription.bind(this)
        this.editImage = this.editImage.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateDatabase=this.updateDatabase.bind(this)
        this.cancelCourse = this.cancelCourse.bind(this)
        this.state = {
            name: '',
            prereq:[],
            preqfor:[],
            description:'',
            outline:[{topic: '',lessonNumber:'',_id:''}],
            startDate: new Date(),
            endDate: new Date(),
            difficultyLevel: '',
            pictureUrl: '',
            topics:[],
            instructorName:''
           
          }
    }

    setVariables(res){
       var outline = res.data.outline;
       var topicsInit = []
       for(var i = 0; i<outline.length;i++){
               topicsInit.push(outline[i]['topic'])
       }
       {this.setState({
        name:res.data.name,
        prereq:res.data.preReq,
        preqfor:res.data.preReqFor,
        description:res.data.description,
        outline:res.data.outline,
        startDate:new Date(res.data.startDate),

        endDate: new Date(res.data.endDate),
        difficultyLevel: res.data.difficultyLevel,
        pictureUrl: res.data.pictureUrl ,
        topics:topicsInit
       
      })

 
}



    }
   
      componentDidMount () {
          GetRequest('courses/'+this.props.match.params.courseid)
          .then(res => this.setVariables(res))


    }

    updateCourseName(e){
        this.setState({name:e.target.value})
    }

    updateStartDate(e){
        this.setState({startDate:e.target.value})
    }
    updateEndDate(e){
        this.setState({endDate:e.target.value})
    }
    updatePreqs(e){
        this.setState({prereq:e.target.value.split(',')})
    }
    updatePreqsFor(e){
        this.setState({preqfor:e.target.value.split(',')})
    }
    updateDiffuculty(e){
        this.setState({diffucultyLevel:e.target.value})
    }

    updateCourseDescription(e){
        this.setState({description:e.target.value})
    }
   
   
    
    cancelCourse = () => {

        GetRequest('courses/'+this.props.match.params.courseid)
        .then(res => {this.setState({
          name:res.data.name,
          prereq:res.data.preReq,
          preqfor:res.data.preReqFor,
          description:res.data.description,
          outline:res.data.outline,
          startDate:new Date(res.data.startDate),

          endDate: new Date(res.data.endDate),
          difficultyLevel: res.data.difficultyLevel,
          pictureUrl: res.data.pictureUrl 
         
        })

   
  })
  setTimeout(() => {
      var topicsInit = []
      for(var i = 0; i<this.state.outline.length;i++){
              topicsInit.push(this.state.outline[i]['topic'])
      }
      this.setState({topics:topicsInit})
    }, 100);

    var userId = this.context.currentUser.email
    GetRequest('users/'+userId)
    .then(res => {this.setState({instructorName:userId})

    })



        document.getElementById("course-form").reset();
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
              this.setState({ pictureUrl: result.data.link});
            })
            .catch(error => console.log('error', error));
        }
      };
    deleteImage() {
        this.setState({ pictureUrl: DEFAULT_COURSE_PIC });
      };


      updateDatabase() {
        const course = {
            name: this.state.name,
            description: this.state.description,
            outline:this.state.outline,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            preReq: this.state.prereq,
            preReqFor: this.state.preqfor,
            difficultyLevel: this.state.diffucultyLevel,
            pictureUrl: this.state.pictureUrl,
            instructor: this.state.instructorName
        }
        
        
    
        PatchRequest('courses/update/'+this.props.match.params.courseid, course)
          .then(res => console.log(res.data))
          .catch(error => console.log('error', error));
        
          setTimeout(() => {
            console.log('Success')
          }, 100);
       
        }
    

    render(){
        return (
            <div className = 'main'>
            <div className = 'content-wrap'>
              <div className='top-navbar'>
                  <h1 className = "dashboard">Edit Course</h1>
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
                            <input onChange = {this.updateCourseName} type="text" className="form-control" id="courseName" name ="courseName" aria-describedby="emailHelp" placeholder="Enter Course" value = {this.state.name}/>

                             <label htmlFor="courseDescription" className = 'add-course-des'>Course Description: </label>
                            <input onChange={this.updateCourseDescription} type="text" className="form-control" id="courseDescription" name ="courseDescription" aria-describedby="emailHelp" placeholder="Enter Course Description: "        value={this.state.description}/>
    
                            <div className = 'course-dates'>
                            <label htmlFor="start">Start date: </label>

                            <input onChange={this.updateStartDate} type="date" id="start" name ="start" className = 'date-of-course' value = {moment(this.state.startDate).format('YYYY-MM-DD')}/>
                            <label htmlFor="end" className = 'end-label'>End Date:  </label>

                            <input onChange={this.updateEndDate} type="date" id="end" name = "end" className = 'date-of-course' value = {moment(this.state.endDate).format('YYYY-MM-DD')}/>
                            </div>
                            <br></br>
                            <div className = 'course-prereq'>
                                <label htmlFor="coursePrereq" >Pre-Requisite(s) (seperate by comma) </label>
                                <input onChange={this.updatePreqs} type="text" className="form-control" id="coursePrereq" name ="coursePrereq" aria-describedby="emailHelp" placeholder="If there are any pre-requisite(s) for the course, enter them here" value = {this.state.prereq}></input>  
                                </div>

                                <div className = 'prereq-for'>
                                <label htmlFor="prereqs-for" >Pre-Requisite for (seperate by comma) </label>
                                <input onChange={this.updatePreqsFor} type="text" className="form-control" id="prereqs-for" name = "prereqs-for" aria-describedby="emailHelp" placeholder="If this course is a pre-requisite for any course, enter them here" value = {this.state.preqfor}></input>  
                            </div>
    
                            <div className ='diffuculty-level'>
                                <label htmlFor="exampleFormControlSelect1">Diffuculty Level</label>
                                <select onChange={this.updateDiffuculty} className="form-control" id="exampleFormControlSelect1" value = {this.state.difficultyLevel}>
                                    
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
                                <img className="course-image"src={this.state.pictureUrl ||DEFAULT_COURSE_PIC} alt=""/>
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
                                        <input type = "text" onChange ={(e)=>this.handleChange(e,index)} name = {index} className = "topicIn" value = {topic}/>
                                        <button onClick = {(e)=>this.handleRemove(index)} type="button" className="btn btn-dark btn-sm">Remove</button>
                                            </div>


                                    )
                                }
                                )
                            }
                            <br/>
                            <button type = "button" onClick = {this.updateDatabase} id = "submitButton" className="btn btn-lg btn-primary">Save</button>
                            <button type="button" id = "discardButton" className="btn btn-lg btn-primary" onClick = {this.cancelCourse}>Discard Changes</button>
                            <br></br>
                           
                           
                            <Link to = {`/announcement/${encodeURIComponent(this.props.match.params.courseid)}`}>
                            <button type = "button" id = "announceButton" className="btn btn-lg btn-primary">Create Announcement</button></Link>
                                </div>
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

EditCourse.contextType = AuthContext;