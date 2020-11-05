import React from 'react';
import { Grid } from '@material-ui/core';
import Footer from '../../Footer/footer.component';
import ProfileBar from '../../Profile/profile-navbar.component';
import './FormatWrapper.css'


const PageWrapper = ({ children }) => (
  <div className="main">
    <div className="content-wrap">
      <Grid container direction="row" spacing={1} className='content'>
        <Grid item>
          <ProfileBar />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </div>
  </div>
)

export default PageWrapper;