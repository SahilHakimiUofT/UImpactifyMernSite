import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './MyClasses.css';
import { substringIgnoreCase } from '../../../helpers/helperfunctions';
import { text } from './MyClassesList.text';
import SearchBar from '../../SearchBar/SearchBar';
import PageWrapper from '../../PageWrapper/PageWrapper'
import WishList from '../Wishlist/wishList'
import { GetRequest } from '../../../helpers/httprequests';
import { AuthContext } from '../../../Auth';


const ClassesCard = ({ classes }) => (
  <Grid
    container
    direction='column'
    alignItems='center'
    justify='center'
    spacing={1}
    className='classes-card'
  >
    <Grid item xs>
      <img
        src={classes.courseId.pictureUrl}
        className='class-image'
      />
    </Grid>
    <Grid item xs>
      {classes.courseId.name}
    </Grid>
    <Grid item xs>
      <Link to={`/all-courses/${encodeURIComponent(classes.courseId._id)}`}>
        <button className='btn btn-outline-primary learn-more-btn'>
          <b>{text.openButton}</b>
        </button>
      </Link>
        <button className='btn btn-outline-primary drop-btn' >
                    <b>Drop Course</b>
        </button>
      
    </Grid>
  </Grid>
)

const ClassesListContent = ({ courses = [] }) => {
  const [searchText, setSearchText] = React.useState('');

  const filteredList = courses.filter(classes => (
    substringIgnoreCase(classes.courseId.name, searchText)
  ));

  return (
    <Grid container direction='column' alignItems='center' className='page-content' spacing={4}>
      <Grid item className='search'>
        <SearchBar onChange={setSearchText} />
      </Grid>
      <Grid item container direction='column' alignItems='center'>
        <Grid item><h4>{text.allClasses}</h4></Grid>
        <Grid item><h6>{text.searching}</h6></Grid>
      </Grid>
      <Grid item container direction='row' spacing={4} className='all-classes-list'>
        {
          filteredList.map((classes) => (
            <Grid key={classes.courseId.id} item xs={3}>
              <ClassesCard classes={classes} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

const AllClassesList = ({ courses }) => (
  <PageWrapper>
    <ClassesListContent courses={courses} />
    <WishList />
  </PageWrapper>
)

export default class AllEnrolled extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datas:[]
    }  
  }
  
  componentDidMount() {
      let userId = this.context.currentUser.email;
  
    GetRequest('users/' + userId)
    .then(response => {
      console.log(response)
      this.setState({
        datas:response.data.enrollCourse
      })
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      <AllClassesList courses={this.state.datas} />
    );
  }
}

AllEnrolled.contextType = AuthContext;