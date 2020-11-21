import React, { Component } from 'react'
import { GetRequest, PostRequest } from '../../helpers/httprequests'
import '../Learner/CourseDetailView/CourseDetail.css'
import { Grid } from '@material-ui/core'
import { AuthContext } from '../../Auth'


export default class EnrollCourse extends Component{
    constructor(props){
        super(props);
        
        this.updateDatabase = this.updateDatabase.bind(this);
        this.updateEnrollCourse = this.updateEnrollCourse.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email:'',
            enrollCourse:[{courseId:''}],
        }  
    }
    
    componentDidMount() {
       //let userId = this.context.currentUser.email;

        GetRequest('users/' + this.context.currentUser.email) 
        .then(response => {
                this.setstate({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    enrollCourse: response.data.enrollCourse,
                })
            })
            .catch(function(error) {
                console.log(error);
              })
    }

    updateDatabase() {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            enrollCourse: this.state.enrollCourse,
        }
    
        PostRequest('users/update/' + this.state.id, user)
          .then(res => console.log(res.data))
      }

    updateEnrollCourse(e, index) {
            this.state.courseId[index] = e.target.value
            this.state.setState({courseId:this.state.courseId})

            var newEnrollCourse = {"courseId": this.state.courseId[index]}

            this.state.enrollCourse[index] =newEnrollCourse
            console.log(this.state.enrollCourse, "$$$$")
        }
        
    render() {
        return(
            <div>
                <Grid item>
                <button className='btn btn-outline-primary enroll-btn' onClick={this.updateEnrollCourse}>
                    <b>Enroll Course</b>
                </button>
                </Grid>
            </div>
        )
    }

}

EnrollCourse.contextType = AuthContext;

    
