import React, { Component } from 'react'
import Editable from './editable.component'
import { Grid } from '@material-ui/core'
import Footer from '../footer.component'
import ProfileBar from './profile-navbar.component'
import "./profile.css"
import { GetRequest, PostRequest } from '../../helpers/httprequests'
import { AuthContext } from '../../Auth'
import {
  IMGUR_CLIENT_ID,
  DEFAULT_PROFILE_PIC,
} from "../../helpers/constants";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.updateDatabase = this.updateDatabase.bind(this);
    this.generalInfo = this.generalInfo.bind(this);
    this.personalInfo = this.personalInfo.bind(this);
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateEducation = this.updateEducation.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateLanguages = this.updateLanguages.bind(this);
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.editImage = this.editImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.state = {
      id: '',
      userType: '',
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

    GetRequest('users/' + userId)
      .then(response => {
        console.log(response)
        this.setState({
          id: userId,
          userType: response.data.userType,
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
      languages: this.state.languages,
      education: this.state.education
    }

    PostRequest('users/update/' + this.state.id, user)
      .then(res => console.log(res.data))
  }

  updateFirstName(value) {
    this.setState({ firstName: value })
  }

  updateLastName(value) {
    this.setState({ lastName: value })
  }

  updateEducation(value) {
    this.setState({ education: value })
  }

  updateSkills(value) {
    this.setState({ skills: value })
  }

  updateLanguages(value) {
    this.setState({ languages: value })
  }

  updateDescription(value) {
    this.setState({ description: value })
  }

  updateEmail(value) {
    this.setState({ email: value })
  }

  updatePhoneNumber(value) {
    this.setState({ phoneNumber: value })
  }

  coursesComponent() {
    return (
      <React.Fragment>
        <h5>Completed Course</h5>
        <div>{this.state.completedCourses === '' ? "none" : this.state.completedCourses}&nbsp;</div> 
      </React.Fragment>
    )
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
        <h4 className="info-title">{this.state.firstName === "" && this.state.lastName == "" ? "name not set" : this.state.firstName + " " + this.state.lastName}</h4>
        <hr/>
        <h5>Education</h5>
        <Editable content={this.state.education} updateField={this.updateEducation}/>
        &nbsp;
        <h5>Skills</h5>
        <Editable content={this.state.skills} updateField={this.updateSkills}/>
        &nbsp;
        {this.state.userType === 'learner' ? this.coursesComponent() : ""}
        &nbsp;
        <h5>Languages</h5>
        <Editable content={this.state.languages} updateField={this.updateLanguages}/>
        &nbsp;
        <h5>Description</h5>
        <Editable content={this.state.description} updateField={this.updateDescription}/>
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
            <Editable content={this.state.firstName} updateField={this.updateFirstName}/>
            &nbsp;
            <h5>Email Address</h5>
            <Editable content={this.state.email} updateField={this.updateEmail}/>
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
            <Editable content={this.state.lastName} updateField={this.updateLastName}/>
            &nbsp;
            <h5>Phone number</h5>
            <Editable content={this.state.phoneNumber} updateField={this.updatePhoneNumber}/>
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
              <ProfileBar/>
            </Grid>
            <Grid xs container direction="column">
              {this.generalInfo()}
              <Grid item>
                <button className="btn btn-primary btn-save" onClick={this.updateDatabase}>Save</button>
              </Grid>
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

Profile.contextType = AuthContext;
