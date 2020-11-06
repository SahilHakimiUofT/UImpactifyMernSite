import React, { Component, Profiler } from 'react';
import Navbar from './socialInitNavbar.component.js';
import Footer from '../Footer/footer.component';
import './socialInitDashboard.css'; //fix this to match profile.css
import Editable from '../Profile/editable.component'
import { Grid } from '@material-ui/core'
import { GetRequest, PostRequest } from '../../helpers/httprequests'
import { AuthContext } from '../../Auth'
import {
  IMGUR_CLIENT_ID,
  DEFAULT_PROFILE_PIC,
} from "../../helpers/constants";


export default class SocialInitiativeDashboard extends Component{
    constructor(props) {
        super(props);
    
        this.updateDatabase = this.updateDatabase.bind(this);
        this.generalInfo = this.generalInfo.bind(this);
        this.personalInfo = this.personalInfo.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
        this.editImage = this.editImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    
        this.state = {
          id: '',
          userType: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          description: '',
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
              description: response.data.description,
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
          description: this.state.description,
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
    
      updateDescription(value) {
        this.setState({ description: value })
      }
    
      updateEmail(value) {
        this.setState({ email: value })
      }
    
      updatePhoneNumber(value) {
        this.setState({ phoneNumber: value })
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

      generalInfo(){
        return(
          <Grid item className="padding">
            <img className="small-image" src={this.state.imageUrl || DEFAULT_PROFILE_PIC} alt=""/>
            <h4 className="info-title">{this.state.firstName === "" && this.state.lastName == "" ? "Organization Name" : this.state.firstName + " " + this.state.lastName}</h4>
            <hr/>
            <h5>Organization Description</h5>
            <Editable content={this.state.description} updateField={this.updateDescription}/>
          </Grid>
        )
      }
    
      personalInfo() {
        return (
          <div className="padding">
            <h4>Your Information</h4>
            <hr/>
            <Grid container direction="row" justify="center">
              <Grid xs container direction="row">
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
                <h5>First Name</h5>
                <Editable content={this.state.firstName} updateField={this.updateFirstName}/>
                &nbsp;
                <h5>Email Address</h5>
                <Editable content={this.state.email} updateField={this.updateEmail}/>
                &nbsp;
                </Grid>
              <Grid xs container direction="row">
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
            <div className='top-nav'>
              <h1 className = "dashboard">Dashboard</h1>
            </div>
              <Grid container direction="row">
                <Grid item>
                  <Navbar/>
                </Grid>
                <Grid xs container direction="row">
                  {this.generalInfo()}
                <Grid item>
                  <button className="btn btn-primary btn-save" onClick={this.updateDatabase}>Save</button>
                </Grid>
                <Grid xs container direction="row">
                  {this.personalInfo()}
                </Grid>
                </Grid>
              </Grid>
              <Footer/>
            </div>
          </div>
        )
      }  
}

SocialInitiativeDashboard.contextType = AuthContext;