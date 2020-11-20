import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import learnerItems from '../Learner/learnerNavItems'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './opportunities.css';


export default function PositionCom ({ position, openApplyDialog }) {
    return (
        <container>
            <leanerItems />
                <Card className="mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between" >
                            <div className='opportunity-card-content'>
                                <Card.Title>
                                    {position.positionTitle} - 
                                    <span className="text-muted font-weight-light">{position.organization}</span>
                                </Card.Title>
                                <Badge variant="info" className="ml-0"> {position.employmentType}</Badge>
                                <Badge variant="info" >{position.location}</Badge>
                                <div style={{ wordBreak: 'break-all' }}>
                                    {position.description}
                                </div>
                                <div className='apply-btn-container'>
                                  <button onClick={openApplyDialog} className='btn btn-outline-primary apply-btn'>
                                    <b>Apply</b>
                                  </button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
        </container> 
    )
}