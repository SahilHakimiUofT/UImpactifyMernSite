import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './InitiativeList.css';
import { text } from './InitiativeList.text';
import SearchBar from '../SearchBar/SearchBar';
import { substringIgnoreCase } from '../../helpers/helperfunctions';
import PageWrapper from '../PageWrapper/PageWrapper'
import { GetRequest } from '../../helpers/httprequests';
import { DEFAULT_INITIATIVE_PIC } from '../../helpers/constants';

const InitiativeCard = ({ initiative }) => (
  <Grid
    container
    direction='column'
    alignItems='center'
    justify='center'
    spacing={1}
    className='initiative-card'
  >
    <Grid item xs>
      <img
        src={initiative.profilePicUrl || DEFAULT_INITIATIVE_PIC}
        className='initiative-image'
      />
    </Grid>
    <Grid item xs>
      {initiative.userName}
    </Grid>
    <Grid item xs>
      <Link to={`/initiatives/${encodeURIComponent(initiative._id)}`}>
        <button className='btn btn-outline-primary learn-more-btn'>
          <b>{text.learnMoreButton}</b>
        </button>
      </Link>
    </Grid>
  </Grid>
)

const InitiativeListBase = () => {
  const [initiativeList, setInitiativesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    GetRequest('initiatives/')
      .then((resp) => {
        setInitiativesList(resp.data)
      })
  }, [])

  const filteredList = initiativeList.filter(initiative => (
    substringIgnoreCase(initiative.userName, searchText)
  ));

  return (
    <Grid container direction='column' alignItems='center' className='page-content' spacing={4}>
      <Grid item className='search'>
        <SearchBar onChange={setSearchText} />
      </Grid>
      <Grid item container direction='column' alignItems='center'>
        <Grid item><h4>{text.allInitiatives}</h4></Grid>
        <Grid item><h6>{text.trySearching}</h6></Grid>
      </Grid>
      <Grid item container direction='row' spacing={4} className='initiative-list'>
        {
          filteredList.map((initiative) => (
            <Grid key={initiative._id} item xs={3}>
              <InitiativeCard initiative={initiative} />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

const InitiativeList = () => (
  <PageWrapper>
    <InitiativeListBase />
  </PageWrapper>
)

export default InitiativeList;