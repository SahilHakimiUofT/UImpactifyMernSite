import React, { Component} from 'react';
import Footer from '../Footer/footer.component';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { navbarItems } from './navbarItems.js';
import logo from '../../images/UImpactify-logo.png';
import placeholder from '../../images/placeholder.png';
import './addcourse-style.css';
export default class Consultant extends Component{
    state  = {
        courseImg:placeholder,
        topics:[]
    }

    imgHandler = (e) =>{
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState ===2){
                this.setState({courseImg:reader.result})
            }
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
          }
        
    }

    cancelCourse = () => { 
        document.getElementById("course-form").reset();
        this.setState({courseImg:placeholder})
        this.setState({topics:[]})
      }

    addTopic(){
        this.setState({topics:[...this.state.topics,""]})
    }
    handleChange(e,index){
        this.state.topics[index] = e.target.value
this.setState({topics:this.state.topics})
    }
    
    handleRemove(index){

        this.state.topics.splice(index,1)
        console.log(this.state.topics,"$$$$")
        this.setState({topics: this.state.topics})
    }

    handleSubmit(e){

        console.log(this.state,"$$$$")
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
    <input type="text" className="form-control" id="courseName" name ="courseName" aria-describedby="emailHelp" placeholder="Enter Course"></input>  
    
<div className = 'course-dates'>
    <label htmlFor="start">Start date: </label>

    <input type="date" id="start" name ="start" className = 'date-of-course'></input>
    

   
    <label htmlFor="end" className = 'end-label'>End Date:  </label>

    <input type="date" id="end" name = "end" className = 'date-of-course'></input>
    </div>
<br></br>
    <div className = 'course-prereq'>
    <label htmlFor="coursePrereq" >Pre-Requisite(s) </label>
    <input type="text" className="form-control" id="coursePrereq" name ="coursePrereq" aria-describedby="emailHelp" placeholder="If there are any pre-requisite(s) for the course, enter them here"></input>  
    </div>

    <div className = 'prereq-for'>
    <label htmlFor="prereqs-for" >Pre-Requisite for </label>
    <input type="text" className="form-control" id="prereqs-for" name = "prereqs-for" aria-describedby="emailHelp" placeholder="If this course is a pre-requisite for any course, enter them here"></input>  
    </div>
    
    <div className ='diffuculty-level'>
    <label htmlFor="exampleFormControlSelect1">Diffuculty Level</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    </div>
    <div className = 'courseImage'>
    <label htmlFor="courseImage" className = 'imageLabel'>Course Image</label>
    <input type = 'file' accept = "image/*" id = "courseImage" name = "courseImage" onChange = {this.imgHandler}></input>
    <img src = {courseImg} alt='course-img' id = 'courseImg' className = 'courseImg'/>
    </div>

    <div className = 'courseOutline'>
<h1 className = 'outlineHeader'>Course Outline</h1>
<p>What are the topics in this course?</p>


<button onClick = {(e)=>this.addTopic(e) }type="button" class="btn btn-lg btn-primary">Add Topic</button>
{
    this.state.topics.map((topic,index)=>{
        return(
            <div key={index}>
             <label htmlFor = {index}>Week #{index+1}</label>   
             <input type = "text" onChange ={(e)=>this.handleChange(e)} name = {index} className = "topicIn"/>
             <button onClick = {(e)=>this.handleRemove()} type="button" className="btn btn-dark btn-sm">Remove</button>
                </div>


        )
    }
    )
}
<br/>

<button  onClick = {(e)=>this.handleSubmit()} id = "submitButton" className="btn btn-lg btn-primary">Submit</button>




<button type="button" id = "discardButton" class="btn btn-lg btn-primary" onClick = {this.cancelCourse}>Discard</button>

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