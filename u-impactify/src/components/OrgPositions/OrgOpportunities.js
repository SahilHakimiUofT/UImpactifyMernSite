import React, { useState } from 'react';
import classnames from 'classnames';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from '@material-ui/core'
import useFetchOrgPositions from './useFetchOrgPositions';
import PositionCom from './OrgPosition.component'
import PositionsPagination from '../Opportunities/PositionsPagination';
import { useHistory } from "react-router-dom";
import { SERVER_BASE_ADDRESS, DEFAULT_PROFILE_PIC } from '../../helpers/constants'
import Navbar from '../SocialInitiative/socialInitNavbar.component.js';
import './OrgPositions.css'
import { DeleteRequest, PostRequest } from '../../helpers/httprequests';
//import SearchForm from './SearchForm.js';

const ApplicationDialog = (props) => {
  const {
    dialogOpen,
    setDialogOpen,
    currentApplication,
    setCurrentApplication,
    currentPosition,
    setCurrentPosition,
    positions,
    dispatch
  } = props;

  const { applicant = {} } = currentApplication || {}

  function applyDialogAction(accepted, action) {
    setDialogOpen(false);
    var mailInfo = {
      email: {type: String},
      subject: {type: String},
      text: {type: String}
    }
    let signoff = "Sincerely,\nU-Impactify Hiring"
    if (accepted && action) {
      deleteApplication()
      mailInfo = {
        email: applicant.email,
        subject: 'Hired for ' + currentPosition.positionTitle + ' at ' + currentPosition.organization,
        text: 'Congratulations you have been hired for ' + currentPosition.positionTitle + ' at ' + currentPosition.organization 
              + '. The organzation will be contacting you for further instructions on the process\n\n' + signoff
      }
      PostRequest('email/', mailInfo);
      mailInfo = {
        email: currentPosition.orgemail,
        subject: 'Confirmation of hiring ' + applicant.firstName + ' ' + applicant.lastName + ' for ' + currentPosition.positionTitle,
        text: 'This to confirm that you have hired ' + applicant.firstName + ' ' + applicant.lastName + ' for ' + currentPosition.positionTitle 
              + ". Please follow up with the applicant using email: " + applicant.email + ' for further instructions\n\n' + signoff
      }
      PostRequest('email/', mailInfo);
    } else if (!accepted && action) {
      deleteApplication()
      mailInfo = {
        email: applicant.email,
        subject: 'Rejected for ' + currentPosition.positionTitle + ' at ' + currentPosition.organization,
        text: 'Sorry you have been rejected for ' + currentPosition.positionTitle + ' at ' + currentPosition.organization + '.\n\n' + signoff
      }
      PostRequest('email/', mailInfo);
      mailInfo = {
        email: currentPosition.orgemail,
        subject: 'Confirmation of rejecting ' + applicant.firstName + ' ' + applicant.lastName + ' for ' + currentPosition.positionTitle,
        text: 'This to confirm that you have rejected ' + applicant.firstName + ' ' + applicant.lastName + ' for' + currentPosition.positionTitle + '.\n\n' + signoff
      }
      PostRequest('email/', mailInfo);
    }
    setCurrentApplication(null);
    setCurrentPosition('');
  }

  function deleteApplication() {
    let positionIndex = positions.indexOf(currentPosition);
    currentPosition.applications = currentPosition.applications.filter(app => app._id !== currentApplication._id)
    setCurrentPosition(currentPosition)
    positions[positionIndex] = currentPosition
    dispatch({ type: 'get-data', payload: { positions: positions } });
    DeleteRequest('applications/delete/' + currentApplication._id);
  }

  const hasResume = !!currentApplication?.resumeId;
  const hasCoverLetter = !!currentApplication?.coverLetterId;

  return (
    <Dialog onClose={() => applyDialogAction(false, false)} open={dialogOpen}>
      <DialogTitle id="form-dialog-title">Position: {currentPosition.positionTitle}</DialogTitle>
      <DialogContent>
        <Divider />
        <Grid container direction='column' spacing={2} className='applicant-info'>
          <Grid item>
            <b>Applicant:</b>
          </Grid>
          <Grid item container direction='row' alignItems='center' spacing={1}>
            <Grid item>
              <img
                src={applicant.profilePicUrl || DEFAULT_PROFILE_PIC}
                alt={''}
                className='profile-pic'
              />
            </Grid>
            <Grid item>
              {applicant.firstName + " " + applicant.lastName}
            </Grid>
          </Grid>
          <Grid item container direction='row' alignItems='flex-start' spacing={1}>
            <Grid item xs={6}>
              <b>Education:</b>
              <br />
              {applicant.education}
              &nbsp;
            </Grid>
            <Grid item xs={6}>
              <b>Completed Courses:</b>
              <br />
              {applicant.completedCourses?.join(', ')}
              &nbsp;
            </Grid>
          </Grid>
          <Grid item container direction='row' alignItems='flex-start' spacing={1}>
            <Grid item xs={6}>
              <b>Skills:</b>
              <br />
              {applicant.skills}
              &nbsp;
            </Grid>
            <Grid item xs={6}>
              <b>Languages:</b>
              <br />
              {applicant.languages}
              &nbsp;
            </Grid>
            <Grid item>
              <b>Description:</b>
              <br />
              {applicant.description}
              &nbsp;
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction='row'
            justify='space-around'
            alignItems='flex-start'
          >
            <Grid item>
              <button
                disabled={!hasResume}
                className={classnames(
                  'btn',
                  'btn-outline-primary',
                  {
                    'hire-btn': hasResume,
                    'inactive-btn': !hasResume,
                  }
                )}
                onClick={() => {
                  const downloadUrl = `${SERVER_BASE_ADDRESS}download/${currentApplication?.resumeId}`
                  window.open(downloadUrl, "_blank")
                }}
              >
                Download Resume
                </button>
            </Grid>
            <Grid item>
              <button
                disabled={!hasCoverLetter}
                className={classnames(
                  'btn',
                  'btn-outline-primary',
                  {
                    'hire-btn': hasCoverLetter,
                    'inactive-btn': !hasCoverLetter,
                  }
                )}
                onClick={() => {
                  const downloadUrl = `${SERVER_BASE_ADDRESS}download/${currentApplication?.coverLetterId}`
                  window.open(downloadUrl, "_blank")
                }}
              >
                Download Cover Letter
                </button>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </Grid>
        <DialogContentText className='dialog-message'>
          Would you like to hire or reject this applicant? They will be notified by email of your decision.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          color="secondary"
          className='btn btn-outline-primary reject-btn'
          onClick={() => applyDialogAction(false, true)}
        >
          Reject
        </button>
        <button
          color="primary"
          className='btn btn-outline-primary hire-btn'
          onClick={() => applyDialogAction(true, true)}
        >
          Hire
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default function OrgOpportunities() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { state: {positions, loading, error, hasNextPage}, dispatch } = useFetchOrgPositions(params, page);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [currentPosition, setCurrentPosition] = useState('');

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  let history = useHistory();
  return (
    <Grid container direction="row" className="my-4">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid xs container direction="column">
        <Grid item>
          <div className='top-nav'>
            <h1 className="opportunities">Our Opportunities</h1>
          </div>

        </Grid>
        <Grid item>
          <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </Grid>
        <Grid xs container direction="column">
          {loading && <h1>Loading...</h1>}
          {positions.map(position => {
            return (
              <PositionCom
                key={position._id}
                position={position}
                openApplicationDialog={(application) => {
                  console.log(application)
                  setCurrentApplication(application);
                  setCurrentPosition(position);
                  setDialogOpen(true);
                }}
              />
            )
          })}
        </Grid>
      </Grid>
      <ApplicationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        currentApplication={currentApplication}
        setCurrentApplication={setCurrentApplication}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        positions={positions}
        dispatch={dispatch}
      />
    </Grid>
  )
  //                <SearchForm params={params} onParamChange={handleParamChange} />
}



