import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './MyClasses.css';
import { substringIgnoreCase } from '../../../helpers/helperfunctions';
import { text } from './MyClassesList.text';
import SearchBar from '../../SearchBar/SearchBar';
import PageWrapper from '../../PageWrapper/PageWrapper'

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
        src={classes.image}
        className='class-image'
      />
    </Grid>
    <Grid item xs>
      {classes.name}
    </Grid>
    <Grid item xs>
      <Link to={`/my-classes/${classes.id}`}>
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

const ClassesListContent = () => {
  const [classesList, setClassesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setClassesList(temp_data)
  }, [])

  const filteredList = classesList.filter(classes => (
    substringIgnoreCase(classes.name, searchText)
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
            <Grid key={classes.id} item xs={3}>
              <ClassesCard classes={classes} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

const AllClassesList = () => (
  <PageWrapper>
    <ClassesListContent />
  </PageWrapper>
)

export default AllClassesList;