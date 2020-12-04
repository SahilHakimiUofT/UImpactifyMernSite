import React, { Component } from 'react'
import { GetRequest, PutRequest } from '../../../helpers/httprequests';
import PageWrapper from '../../PageWrapper/PageWrapper';
import { Grid } from '@material-ui/core';
import '../CourseDetailView/CourseDetail.css'
import moment from 'moment';
import { AuthContext } from '../../../Auth'
import {
    IMGUR_CLIENT_ID,
    DEFAULT_PROFILE_PIC,
  } from "../../../helpers/constants";


export default class CoursePage extends Component{
    constructor(props) {
        super(props);
        this.updateDatabase = this.updateDatabase.bind(this);
        this.updateEnrollCourse = this.updateEnrollCourse.bind(this);    
        
        this.state ={
            name:'',
            description:'',
            outline:[{}],
            instructor:'',
            lessons:'',
            tasks:'',
            lessonLength:'',
            startDate:new Date(),
            endDate:new Date(),
            preReq:[],
            preReqFor:[],
            difficultyLevel:'',
            pictureUrl:'',
            enrollCourse:[
                {courseId:''}
            ],
            id:'',
            userType: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            skills: '',
            completedCourses: '',
            userDescription: '',
            languages: '',
            education: '',
            imageUrl: DEFAULT_PROFILE_PIC,
        }
    }

    componentDidMount() {
        let userId = this.context.currentUser.email;

        GetRequest('users/' + userId)
        .then(response => {
            console.log(response)
            this.setState({
                id:userId,
                userType: response.data.userType,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                phoneNumber: response.data.phoneNumber,
                skills: response.data.skills,
                completedCourses: response.data.completedCourses,
                userDescription: response.data.description,
                languages: response.data.languages,
                education: response.data.education,
                imageUrl: response.data.profilePicUrl,
                enrollCourse:response.data.enrollCourse
            })
        })
        .catch(function(error) {
            console.log(error);
        })

        
        let courseId = this.props.match.params.courseid;
        GetRequest('courses/' + courseId)
        .then(res => {this.setState({ 
            courseId:courseId,
            name:res.data.name,
            description:res.data.description,
            outline:res.data.outline,
            instructor:res.data.instructor,
            lessons: res.data.lessons,
            tasks: res.data.tasks,
            lessonLength: res.data.lessonLength,
            startDate: res.data.startDate,
            endDate: res.data.endDate,
            preReq: res.data.preReq,
            preReqFor:res.data.preReqFor,
            difficultyLevel: res.data.difficultyLevel,
            pictureUrl: res.data.pictureUrl,
            })
        })
        .catch(function(error) {
            console.log(error);
        })

    }

    updateDatabase() {

        let courseId = this.props.match.params.courseid;
        console.log(courseId, "$$$$checkCourseId")

        this.updateEnrollCourse(courseId);

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            skills: this.state.skills,
            completedCourses: this.state.completedCourses,
            description: this.state.userDescription,
            languages: this.state.languages,
            education: this.state.education,
            enrollCourse: this.state.enrollCourse,
        }
    
        PutRequest('users/update/' + this.state.id, user)
          .then(res => console.log(res.data))

          console.log(this.state.id,"$4$$$")
    }

    updateEnrollCourse(e) {
        this.setState(prevState => ({
            enrollCourse: prevState.enrollCourse.filter(course => course.courseId._id !== e)
        }))
        console.log(this.state.enrollCourse, "$$$newenrollCourseArray")  
    }

    CourseDetailBase(){
        return (
            <div>
            <Grid item>
                <div>
                    <h1 className="courseTitle">{this.state.name}&nbsp;</h1>
                </div>
            </Grid>
            <Grid item>
                <button className='btn btn-outline-primary enroll-btn' onClick={this.updateDatabase}>
                    <b>Drop Course</b>
                </button>
                       Double Click to Drop the Course
            </Grid>
            <hr />
            <Grid item>
                    <h2>Instructor</h2>
                    <div>{this.state.instructor}&nbsp; </div>
                    <hr />
                </Grid>
                <Grid item>
                    <img src={this.state.pictureUrl} className='course-image'/>
                    <h2>Course Description</h2> 
                    <div>{moment(this.state.startDate).format("DD/MM/YYYY")} - {moment(this.state.endDate).format("DD/MM/YYYY")}</div>
                    <div>Difficulty Level : {this.state.difficultyLevel} </div>
                    <div>Task : {this.state.task}</div>
                </Grid>
                <Grid item>
                    <div>
                        <h7>Pre-Request : </h7>
                        {
                        this.state.preReq.map(preCourse => (
                            <li>{preCourse}</li>
                        ))
                        }
                    </div>
                    <div>
                        <h7>Pre-Request For: </h7>
                        {
                            this.state.preReqFor.map(preCoursefor => (
                                <li>{preCoursefor}</li>
                            ))
                        }
                    </div>
                </Grid>
                <hr />
                <Grid item>
                <div>
                    <h4>Course Outline : </h4>
                    {
                        this.state.outline.map(task => (
                            <div>
                                <li>{task.topic}</li>
                                <div>{task.assessment}</div>
                            </div>
                        ))
                    }
                </div>
                </Grid>
            </div> 
        )
    }

    render() {
        return (
            <div>
                <PageWrapper>
                <Grid>
                    {this.CourseDetailBase()}
                </Grid>
                </PageWrapper>
            </div>
              
        )
      }
}
CoursePage.contextType = AuthContext;

