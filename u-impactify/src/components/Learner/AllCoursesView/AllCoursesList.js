import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './ListAllCourses.css';
import { substringIgnoreCase } from '../../../helpers/helperfunctions';
import { text } from './AllCoursesList.text';
import SearchBar from '../../SearchBar/SearchBar';
import PageWrapper from '../../PageWrapper/PageWrapper'
import { GetRequest } from '../../../helpers/httprequests';
import CourseDetail from '../CourseDetailView/CourseDetail';

const AllCoursesCard = ({ course }) => (
  <Grid
    container
    direction='column'
    alignItems='center'
    justify='center'
    spacing={1}
    className='all-courses-card'
  >
    <Grid item xs>
      <img
        src={course.pictureUrl}
        className='course-image'
      />
    </Grid>
    <Grid item xs>
      {course.name}
    </Grid>
    <Grid item xs>
      <Link to={`/all-courses/${encodeURIComponent(course._id)}`}>
        <button className='btn btn-outline-primary learn-more-btn'>
          <b>{text.learnMoreButton}</b>
        </button>
      </Link>
    </Grid>
  </Grid>
)

const AllCoursesListContent = () => {
  const [coursesList, setCoursesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  
  React.useEffect(() => {
    GetRequest('courses/')
      .then((resp) => {
        setCoursesList(resp.data)
      })
  }, [])
  
  const filteredList = coursesList.filter(course => (
    substringIgnoreCase(course.name, searchText)
  ));

  return (
    <Grid container direction='column' alignItems='center' className='page-content' spacing={4}>
      <Grid item className='search'>
        <SearchBar onChange={setSearchText} />
      </Grid>
      <Grid item container direction='column' alignItems='center'>
        <Grid item><h4>{text.allCourses}</h4></Grid>
        <Grid item><h6>{text.trySearching}</h6></Grid>
      </Grid>
      <Grid item container direction='row' spacing={4} className='all-courses-list'>
        {
          filteredList.map((course) => (
            <Grid key={course._id} item xs={3}>
              <AllCoursesCard course={course} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

const AllCoursesList = () => (
  <PageWrapper>
    <AllCoursesListContent />
  </PageWrapper>
)

export default AllCoursesList;