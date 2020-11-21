import React from 'react'
import { useParams } from 'react-router';
import { GetRequest } from '../../../helpers/httprequests';
import PageWrapper from '../../PageWrapper/PageWrapper';
import { Grid } from '@material-ui/core';
import './CourseDetail.css'
import moment from 'moment';
import EnrollCourse from '../enrollCourse'

function CourseDetailBase() {
    const [state, setState] = React.useState ({
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
        pictureUrl:''
        })
    
    let { id: courseId} = useParams();

    React.useEffect(() => {
        GetRequest('courses/' + courseId)
            .then(response => {
                console.log(response)
                setState({
                    id: courseId,
                    name: response.data.name,
                    description: response.data.description,
                    outline: response.data.outline,
                    instructor: response.data.instructor,
                    lessons: response.data.lessons,
                    tasks: response.data.tasks,
                    lessonLength: response.data.lessonLength,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    preReq: response.data.preReq,
                    preReqFor:response.data.preReqFor,
                    difficultyLevel: response.data.difficultyLevel,
                    pictureUrl: response.data.pictureUrl,
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }, [])

    function courseName() {
        return(
            <div>
                <Grid item>
                    <div>
                        <h1 className="courseTitle">{state.name}&nbsp;</h1>
                    </div>
                </Grid>
            </div>
        ) 
    }


    function enrollCourse() {

        return(
            <div>
                <Grid item>
                <button className='btn btn-outline-primary enroll-btn' >
                    <b>Enroll Course</b>
                </button>
                </Grid>
            </div>
        )
    }



    function generalInfo() {
        return(
            <div>
                <Grid item>
                    <h2>Instructor</h2>
                    <div>{state.instructor}&nbsp; </div>
                    <hr />
                </Grid>
                <Grid item>
                    <img src={state.pictureUrl} className='course-image'/>
                    <h2>Course Description</h2> 
                    <div>{moment(state.startDate).format("DD/MM/YYYY")} - {moment(state.endDate).format("DD/MM/YYYY")}</div>
                    <div>Difficulty Level : {state.difficultyLevel} </div>
                    <div>Task : {state.task}</div>
                </Grid>
                

            </div>
        )
    }


    function coursePreRequest() {
        return(
            <div>
                <h7>Pre-Request : </h7>
                {
                    state.preReq.map(preCourse => (
                        <li>{preCourse}</li>
                    ))
                }
            </div>
        )
    }

    function coursePreRequestFor() {
        return(
            <div>
                <h7>Pre-Request For: </h7>
                {
                    state.preReqFor.map(preCoursefor => (
                        <li>{preCoursefor}</li>
                    ))
                }
            </div>
        )
    }

    function courseoutline() {
        return (
            <div>
                <h4>Course Outline : </h4>
                {
                    state.outline.map(task => (
                        <div>
                            <li>{task.topic}</li>
                            <div>{task.assessment}</div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                {courseName()}
                {enrollCourse()}
                <hr />
                {generalInfo()}
            </Grid>
            <Grid item xs={6}>
                {coursePreRequest()}
                {coursePreRequestFor()}                
            </Grid>
            <Grid item xs={12}>
                <hr />
                {courseoutline()}
            </Grid>
        </Grid>
    )
}

export default class CourseDetail extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <PageWrapper>
            <CourseDetailBase />
        </PageWrapper>
      )
    }
  }
