import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Grid } from '@material-ui/core'
import './OrgPositions.css'

const Application = ({ application, openApplicationDialog }) => {
  return (
    <img
      src={application.applicant.profilePicUrl}
      alt={''}
      style={{ width: '100px', height: '100px' }}
      onClick={() => openApplicationDialog(application)}
    />
  )
}

export default function PositionCom({ position, openApplicationDialog }) {
  return (
    <container>
      <navbarItems />
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className='oppurtunity-card-content'>
              <Card.Title>
                {position.positionTitle} -
                                    <span className="text-muted font-weight-light">{position.organization}</span>
              </Card.Title>
              <Badge variant="info" className="ml-0"> {position.employmentType}</Badge>
              <Badge variant="info" >{position.location}</Badge>
              <div style={{ wordBreak: 'break-all' }}>
                {position.description}
              </div>
              <Grid container direction='column' className='applicants-list-root'>
                <b>Applicants:</b>
                <Grid container direction='row' className='applicants-list'>
                  {position.applications?.map(application => (
                    <Grid item xs={1}>
                      <Application
                        key={application._id}
                        application={application}
                        openApplicationDialog={openApplicationDialog}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </div>
          </div>
        </Card.Body>
      </Card>
    </container>
  )
}
