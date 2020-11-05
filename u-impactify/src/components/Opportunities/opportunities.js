import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import useFetchPositions from  './useFetchPositions.js';
import PositionCom from './Position.component.js'
import PositionsPagination from './PositionsPagination.js';
import { useHistory } from "react-router-dom";
import ProfileBar from '../Profile/profile-navbar.component'
import './opportunities.css'
//import SearchForm from './SearchForm.js';



export default function Opportunities(){

    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { positions, loading, error, hasNextPage} = useFetchPositions(params, page);


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
                        <h1 className="opportunities">Opportunities</h1>
                        </div>
                        
                    </Grid>
                    <Grid item>
                        <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                    </Grid>
                    <Grid xs container direction="column">
                        {loading && <h1>Loading...</h1>}
                        {error && <h1>Error. Try Refreshing.</h1>}
                        {positions.map(position => {
                            return <PositionCom key={position.id} position={position} />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )

        //                <SearchForm params={params} onParamChange={handleParamChange} />
}



