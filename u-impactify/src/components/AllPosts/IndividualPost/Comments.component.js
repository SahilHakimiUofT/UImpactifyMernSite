import React from 'react'
import { Card, Badge } from 'react-bootstrap'
//import learnerItems from '../Learner/learnerNavItems'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import './opportunities.css';


export default function CommentsCom ({ comment }) {
    return (
        <container>
            <leanerItems />
                <Card className="mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between" >
                            <div className='opportunity-card-content'>
                                <Badge variant="info" className="ml-0"> {comment.commentPosterEmail}</Badge>
                                <br/>
                                <div style={{ wordBreak: 'break-all' }}>
                                    {comment.commentContent}
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
        </container> 
    )
}