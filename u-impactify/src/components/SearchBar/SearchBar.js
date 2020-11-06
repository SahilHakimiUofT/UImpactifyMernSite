import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Grid } from '@material-ui/core'
import './SearchBar.css';

/*
  onChange: (text: string) => void
*/
const SearchBar = ({ onChange }) => {
  const [value, setValue] = React.useState('');
  
  const onTextChange = (text) => {
    setValue(text);
    onChange(text);
  }

  return (
    <Grid
      container
      direction='row'
      className='search-bar'
      spacing={1}
    >
      <Grid item xs='auto'>
        <FiSearch />
      </Grid>
      <Grid item xs>
        <input
          className='search-input'
          type='text'
          value={value}
          onChange={e => onTextChange(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default SearchBar;