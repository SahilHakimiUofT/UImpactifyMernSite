import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './wishList.css';
import { substringIgnoreCase } from '../../../helpers/helperfunctions';
import { text } from './wishList.text';
import SearchBar from '../../SearchBar/SearchBar';
import PageWrapper from '../../PageWrapper/PageWrapper'

const temp_data = [
    {
      id: 1,
      name: 'testing',
      image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
    },
    {
      id: 2,
      name: '1234',
      image: 'http://www.pngmart.com/files/4/Science-PNG-File.png',
    },
    {
      id: 3,
      name: 'Physics',
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
    }
  ]

  const WishCard = ({ wish }) => (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      spacing={1}
      className='wish-card'
    >
      <Grid item xs>
        <img
          src={wish.image}
          className='wish-image'
        />
      </Grid>
      <Grid item xs>
        {wish.name}
      </Grid>
      <Grid item xs>
        <Link to={`/all-courses/${encodeURIComponent(wish._id)}`}>
          <button className='btn btn-outline-primary learn-more-btn'>
            <b>{text.learnMoreButton}</b>
          </button>
        </Link>
      </Grid>
    </Grid>
  )
  
  const WishListContent = () => {
    const [wishesList, setWishesList] = React.useState([]);
    
    React.useEffect(() => {
        setWishesList(temp_data)
      }, [])

    return (
      <Grid container direction='column' alignItems='center' className='page-contents' spacing={4}>
          <h1 className='wishlist'>Wishlist</h1>
        <Grid item container direction='row' spacing={4} className='all-wish-list'>
          {
            wishesList.map((wish) => (
              <Grid key={wish.id} item xs={3}>
                <WishCard wish={wish} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    )
  }
  
  export default WishListContent;