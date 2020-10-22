import React, { Component } from 'react'
import Editable from './editable.component'
import { Grid } from '@material-ui/core'
import Footer from '../footer.component'
import LearnerProfileBar from './learner-profile-navbar.component'
import "./profile.css"
import { GetRequest, PostRequest } from '../../helpers/httprequests'
import { AuthContext } from '../../Auth'
import {
  IMGUR_CLIENT_ID,
  DEFAULT_PROFILE_PIC,
} from "../../helpers/constants";

export default class LearnerProfile extends Component {
  constructor(props) {
    super(props);

    this.updateDatabase = this.updateDatabase.bind(this);
    this.generalInfo = this.generalInfo.bind(this);
    this.personalInfo = this.personalInfo.bind(this);
    this.editImage = this.editImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      skills: '',
      completedCourses: '',
      description: '',
      languages: '',
      education: '',
      imageUrl: DEFAULT_PROFILE_PIC,
    }
  }

  componentDidMount() {
    let userId = this.context.currentUser.email;
    console.log(userId);

    GetRequest('users/' + userId)
      .then(response => {
        this.setState({
          id: userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          skills: response.data.skills,
          completedCourses: response.data.completedCourses,
          description: response.data.description,
          languages: response.data.languages,
          education: response.data.education,
          imageUrl: response.data.profilePicUrl,
        })
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  updateDatabase() {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      skills: this.state.skills,
      completedCourses: this.state.completedCourses,
      description: this.state.description,
      languages: this.state.languages
    }

    PostRequest('users/update/' + this.state.id, user)
      .then(res => console.log(res.data))
  }

  editImage(image) {
    if (image) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);

      var formdata = new FormData();
      formdata.append("image", image);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://api.imgur.com/3/image", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({ imageUrl: result.data.link});
          PostRequest(`users/update/photo/` + this.state.id, { profilePicUrl: result.data.link });
        })
        .catch(error => console.log('error', error));
    }
  };

  deleteImage() {
    this.setState({ imageUrl: DEFAULT_PROFILE_PIC });
    PostRequest(`users/update/photo/` + this.state.id, { profilePicUrl: '' });
  };

  generalInfo() {
    return (
      <Grid item className="padding">
        <img className="small-image" src={this.state.imageUrl || DEFAULT_PROFILE_PIC} alt="" />
        <h4 className="info-title">{this.state.firstName + " " + this.state.lastName}</h4>
        <hr/>
        <h5>Education</h5>
        <Editable content={this.state.education} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ education: value})}/>
        &nbsp;
        <h5>Skills</h5>
        <Editable content={this.state.skills} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ skills: value})}/>
        &nbsp;
        <h5>Completed Course</h5>
        <div>{this.state.completedCourses}&nbsp;</div>
        &nbsp;
        <h5>Languages</h5>
        <Editable content={this.state.languages} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ languages: value})}/>
        &nbsp;
        <h5>Description</h5>
        <Editable content={this.state.description} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ description: value})}/>
      </Grid>
    )
  }

  personalInfo() {
    return (
      <div className="padding">
        <h4>Personal Information</h4>
        <hr/>
        <Grid container direction="row" justify="center">
          <Grid xs container direction="column">
            <h5>First Name</h5>
            <Editable content={this.state.firstName} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ firstName: value})}/>
            &nbsp;
            <h5>Email Address</h5>
            <Editable content={this.state.email} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ email: value})}/>
            &nbsp;
            <h5>Picture</h5>
            <Grid item container alignItems='center'>
              <Grid item>
                <img
                  className="profile-image"
                  src={this.state.imageUrl || DEFAULT_PROFILE_PIC}
                  alt=""
                />
              </Grid>
              <Grid item className="buttons">
                <input
                  type="file"
                  id="BtnBrowseHidden"
                  style={{ display: "none" }}
                  onChange={(e) => this.editImage(e.target.files[0])}
                />
                <label
                  htmlFor="BtnBrowseHidden"
                  className="btn btn-secondary action-btn"
                >
                  Edit
                </label>
                <button
                  className="btn btn-secondary action-btn below"
                  onClick={this.deleteImage}
                >
                  Delete
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs container direction="column">
            <h5>Last Name</h5>
            <Editable content={this.state.lastName} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ lastName: value})}/>
            &nbsp;
            <h5>Phone number</h5>
            <Editable content={this.state.phoneNumber} updateDatabase={this.updateDatabase} updateField={(value) => this.setState({ phoneNumber: value})}/>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        <div className="content-wrap">
          <Grid container direction="row">
            <Grid item>
              <LearnerProfileBar/>
            </Grid>
            <Grid xs container direction="column">
              {this.generalInfo()}
            </Grid>
            <Grid xs container direction="column">
              {this.personalInfo()}
            </Grid>
          </Grid>
          <Footer/>
        </div>
      </div>
    )
  }  
}

LearnerProfile.contextType = AuthContext;