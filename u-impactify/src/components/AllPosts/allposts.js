import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core'
import useFetchPosts from  './useFetchPosts';
import PostsCom from './Posts.component'
import PositionsPagination from '../Opportunities/PositionsPagination';
import { useHistory } from "react-router-dom";
import ProfileBar from '../Profile/profile-navbar.component'
import '../Opportunities/opportunities.css'
import { Modal } from './Modal'
import { GlobalStyle } from './GlobalStyle';


const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1
}

export default function AllPosts(){
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { posts, loading, error, hasNextPage} = useFetchPosts(params, page);

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
            <Grid container direction = "row" className="my-4">
                <Grid item>
                    <ProfileBar/>
                </Grid>
                <Grid xs container direction="column">
                    <Grid item>
                        <div className='top-nav'>
                        <h1 className="posts"> All Posts</h1>
                        </div>
                        <br />
                    </Grid>
                    <Grid item>
                        <div style={BUTTON_WRAPPER_STYLES}>
                            <button className='btn-outline-primary learn-more-btn' onClick={openModal}>Start A New Discussion</button>
                            <div>
                              <Modal showModal={showModal} setShowModal={setShowModal} />
                                <GlobalStyle />
                             </div>
                        </div>
                        
                        <br />
                    </Grid>
                    <Grid xs container direction="column">
                        {loading && <h1>Loading...</h1>}
                        {posts.map(post => {
                            return <PostsCom key={posts.id} post={post} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )

        //                <SearchForm params={params} onParamChange={handleParamChange} />
}