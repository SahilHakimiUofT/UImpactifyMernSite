import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './ListAllCourses.css';
import { text } from './AllCoursesList.text';
import SearchBar from './AllCoursesSearchBar';
import FormatWrapper from './FormatWrapper'

const temp_data = [
  {
    id: 1,
    name: 'CSC209H: Intro to Computer Science',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 2,
    name: 'MATB41: Calculus',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 3,
    name: 'PHY202: Physics',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 4,
    name: 'SCI202: Astronomy',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 5,
    name: 'Algorithms Complexity',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 6,
    name: 'Linear Algebra',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 7,
    name: 'Derivatives',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  },
  {
    id: 8,
    name: 'Java Crash Course',
    image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
  }
]

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
        src={course.image}
        className='course-image'
      />
    </Grid>
    <Grid item xs>
      {course.name}
    </Grid>
    <Grid item xs>
      <Link to={`/all-courses/${course.id}`}>
        <button className='btn btn-outline-primary learn-more-btn'>
          <b>{text.learnMoreButton}</b>
        </button>
      </Link>
    </Grid>
  </Grid>
)

const substringIgnoreCase = (str, sub) => (
  str.toLowerCase().includes(sub.toLowerCase())
)

const AllCoursesListContent = () => {
  const [coursesList, setCoursesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setCoursesList(temp_data)
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
            <Grid key={course.id} item xs={3}>
              <AllCoursesCard course={course} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

const AllCoursesList = () => (
  <FormatWrapper>
    <AllCoursesListContent />
  </FormatWrapper>
)

export default AllCoursesList;