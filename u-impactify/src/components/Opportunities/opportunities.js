import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import useFetchPositions from './useFetchPositions.js';
import PositionCom from './Position.component.js'
import PositionsPagination from './PositionsPagination.js';
import { useHistory } from "react-router-dom";
import ProfileBar from '../Profile/profile-navbar.component'
import './opportunities.css'
import { PostRequest } from '../../helpers/httprequests';
import { AuthContext } from '../../Auth';
//import SearchForm from './SearchForm.js';

export default function Opportunities() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { positions, loading, error, hasNextPage } = useFetchPositions(params, page);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPosition, setPosition] = useState();
  const [resume, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetterFile] = useState(null);
  const [resumeId, setResumeId] = useState('');
  const [coverLetterId, setCoverLetterId] = useState('');
  const [resumeDone, setResumeDone] = useState(false);
  const [coverLetterDone, setCoverLetterDone] = useState(false);
  const userId = React.useContext(AuthContext).currentUser?.email;

  function readResume(e) {
    const file = e.target.files[0];
    setResumeFile(file);
  }

  function readCoverLetter(e) {
    const file = e.target.files[0];
    setCoverLetterFile(file);
  }

  function applyDialogAction(applied) {
    setDialogOpen(false);
    setResumeFile(null);
    setCoverLetterFile(null);
    if (applied) {
      if (resume) {
        const data = new FormData();
        data.append("file", resume);
        PostRequest('upload', data)
          .then(response => {
            setResumeId(response.data.id);
            setResumeDone(true);
          })
      } else {
        setResumeId('');
        setResumeDone(true);
      }

      if (coverLetter) {
        const data = new FormData();
        data.append("file", coverLetter);
        PostRequest('upload', data)
          .then(response => {
            setCoverLetterId(response.data.id);
            setCoverLetterDone(true);
          })
      } else {
        setCoverLetterDone(true);
        setCoverLetterId('');
      }
    }
  }

  React.useEffect(() => {
    if (resumeDone && coverLetterDone) {
      console.log(selectedPosition);
      const data = {
        positionId: selectedPosition._id,
        applicantId: userId,
        resumeId: resumeId,
        coverLetterId,
      }
      PostRequest('applications/add', data)

      setResumeDone(false);
      setCoverLetterDone(false);
      setResumeId('');
      setCoverLetterId('');
      setPosition(null);
    }
  }, [resumeDone, coverLetterDone])

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
        <ProfileBar />
      </Grid>
      <Grid xs container direction="column">
        <Grid item>
          <div className='top-nav'>
            <h1 className="opportunities">Opportunities</h1>
          </div>
        </Grid>
        <Grid item>
          <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </Grid>
        <Grid xs container direction="column">
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error. Try Refreshing.</h1>}
          {positions.map(position => {
            return (
              <PositionCom
                key={position.id}
                position={position}
                openApplyDialog={() => {
                  setPosition(position);
                  setDialogOpen(true)
                }}
              />
            )
          })}
        </Grid>
      </Grid>
      <Dialog open={dialogOpen}>
        <DialogTitle id="form-dialog-title">Apply to: {selectedPosition?.positionTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload your resume and cover letter. You will receive an email if you are accepted for this position
          </DialogContentText>
        </DialogContent>
        <Grid container direction='column'>
          <Grid item container direction='row'>
            <Grid item>
              <input
                type="file"
                onChange={readResume}
                id='resumeUpload'
                style={{ display: "none" }}
              />
              <label
                htmlFor="resumeUpload"
                className="btn btn-secondary action-btn"
              >
                Upload Resume
              </label>
            </Grid>
            <Grid item className='file-label'>
              {resume?.name}
            </Grid>
          </Grid>
          <Grid item container direction='row'>
            <Grid item>
              <input
                type="file"
                onChange={readCoverLetter}
                id='coverLetterUpload'
                style={{ display: "none" }}
              />
              <label
                htmlFor="coverLetterUpload"
                className="btn btn-secondary action-btn"
              >
                Upload Cover Letter
              </label>
            </Grid>
            <Grid item className='file-label'>
              {coverLetter?.name}
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <button
            color="primary"
            className='btn btn-outline-primary apply-btn'
            onClick={() => applyDialogAction(false)}
          >
            Cancel
          </button>
          <button
            color="primary"
            className='btn btn-outline-primary apply-btn'
            onClick={() => applyDialogAction(true)}
          >
            Apply
          </button>
        </DialogActions>
      </Dialog>
    </Grid>
  )

  //                <SearchForm params={params} onParamChange={handleParamChange} />
}



