import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import useFetchPositions from  './useFetchPositions.js';
import PositionCom from './Position.component.js'
import PositionsPagination from './PositionsPagination.js';
import SearchForm from './SearchForm.js';


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

        return (
            <Container className="my-4">
                <h1 className="mb-4" >Opportunities</h1>
                <SearchForm params={params} onParamChange={handleParamChange} />
                <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                {loading && <h1>Loading...</h1>}
                {error && <h1>Error. Try Refreshing.</h1>}
                {positions.map(position => {
                    return <PositionCom key={position.id} position={position} />
                })}
                <PositionsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                
            </Container>
        )
    
    
}



