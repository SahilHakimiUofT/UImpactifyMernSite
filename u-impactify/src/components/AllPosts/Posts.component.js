import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import learnerItems from '../Learner/learnerNavItems'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Opportunities/opportunities.css';
import { Link } from 'react-router-dom';


export default function PostsCom ({ post, openApplyDialog }) {
    return (
        <container>
            <leanerItems />
                <Card className="mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between" >
                            <div className='opportunity-card-content'>
                                <Card.Title>
                                    {post.postTitle} - 
                                    <span className="text-muted font-weight-light">{post.postAuthorEmail}</span>
                                </Card.Title>
                                <Badge variant="info" className="ml-0"> {post.numComments} Comments</Badge>
                                <br/>
                                <div style={{ wordBreak: 'break-all' }}>
                                    {post.postContent}
                                </div>
                                <Link to={`/posts/${encodeURIComponent(post._id)}`}>
                                    <button className='btn btn-outline-primary viewPost'>
                                        <b>View Full Post</b>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
        </container> 
    )
}