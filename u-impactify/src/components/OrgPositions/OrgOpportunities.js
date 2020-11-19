import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import useFetchOrgPositions from  './useFetchOrgPositions';
import PositionCom from './OrgPosition.component'
import PositionsPagination from '../Opportunities/PositionsPagination';
import { useHistory } from "react-router-dom";
import ProfileBar from '../Profile/profile-navbar.component'
import Navbar from '../SocialInitiative/socialInitNavbar.component.js';
import '../Opportunities/opportunities.css'
//import SearchForm from './SearchForm.js';



export default function OrgOpportunities(){

    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { positions, loading, error, hasNextPage} = useFetchOrgPositions(params, page);


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
                    <Navbar/>
                </Grid>
                <Grid xs container direction="column">
                    <Grid item>
                        <div className='top-nav'>
                        <h1 className="opportunities">Our Opportunities</h1>
                        </div>
                        
                    </Grid>
                    <Grid item>
                        <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                    </Grid>
                    <Grid xs container direction="column">
                        {loading && <h1>Loading...</h1>}

                        {positions.map(position => {
                            return <PositionCom key={position.id} position={position} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )

        //                <SearchForm params={params} onParamChange={handleParamChange} />
}



