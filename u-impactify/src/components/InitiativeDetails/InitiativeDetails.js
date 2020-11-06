import React, { Component } from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import Footer from '../Footer/footer.component';
import './InitiativeDetails.css';
import { Grid } from '@material-ui/core';
import { GetRequest, PostRequest } from '../../helpers/httprequests';
import { AuthContext } from '../../Auth';
import { useParams } from "react-router";
import {
  DEFAULT_PROFILE_PIC,
  DEFAULT_INITIATIVE_PIC,
} from "../../helpers/constants";

function InitiativeDetailsBase() {
  const [state, setState] = React.useState({
    id: '',
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    description: '',
    imageUrl: DEFAULT_PROFILE_PIC,
  })

  let { id: userId } = useParams();

  React.useEffect(() => {
    GetRequest('users/' + userId)
      .then(response => {
        console.log(response)
        setState({
          id: userId,
          userType: response.data.userType,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          description: response.data.description,
          imageUrl: response.data.profilePicUrl,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  function generalInfo() {
    return (
      <Grid item className="padding">
        <img className="small-image" src={state.imageUrl || DEFAULT_INITIATIVE_PIC} alt="" />
        <h4 className="info-title">{state.firstName === "" && state.lastName == "" ? "Organization Name" : state.firstName + " " + state.lastName}</h4>
        <hr />
        <h5>Organization Description</h5>
        <div className='description'>{state.description}&nbsp;</div>
      </Grid>
    )
  }

  function personalInfo() {
    return (
      <div className="padding">
        <h4>Contact Information</h4>
        <hr />
        <Grid container direction="column" justify="center" spacing={1}>
          <Grid item>
            <h5>First Name</h5>
            <div>{state.firstName}&nbsp;</div>
          </Grid>
          <Grid item>
            <h5>Email Address</h5>
            <div>{state.email}&nbsp;</div>
          </Grid>
          <Grid item>
            <h5>Last Name</h5>
            <div>{state.lastName}&nbsp;</div>
          </Grid>
          <Grid item>
            <h5>Phone number</h5>
            <div>{state.phoneNumber}&nbsp;</div>
          </Grid>
        </Grid>
      </div>
    )
  }


  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        {generalInfo()}
      </Grid>
      <Grid item xs={6}>
        {personalInfo()}
      </Grid>
    </Grid>
  )
}

export default class InitiativeDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageWrapper>
        <InitiativeDetailsBase />
      </PageWrapper>
    )
  }
}