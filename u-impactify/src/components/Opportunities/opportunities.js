import React, { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import useFetchPositions from  './useFetchPositions.js';
import PositionCom from './Position.component.js'
import PositionsPagination from './PositionsPagination.js';
import { useHistory } from "react-router-dom";
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
            <Container className="my-4">
                <div className='top-nav'></div>
                
                <h1 className="mb-4" >Opportunities</h1>
                <Row>
                    <Col xs={1}>
                    <button className="btn btn-outline-primary" onClick={() => history.goBack()}>Back</button> 
                    </Col>

                    <Col xs={3}>
                        <PositionsPagination className="btn btn-outline-primary" page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                    </Col>
                </Row>
                    
                {loading && <h1>Loading...</h1>}
                {error && <h1>Error. Try Refreshing.</h1>}
                {positions.map(position => {
                    return <PositionCom key={position.id} position={position} />
                })}
                <Row>
                    <Col xs={1}>
                    <button className="btn btn-outline-primary" onClick={() => history.goBack()}>Back</button> 
                    </Col>

                    <Col xs={3}>
                        <PositionsPagination className="btn btn-outline-primary" page={page} setPage={setPage} hasNextPage={hasNextPage}/>
                    </Col>
                </Row>
            </Container>
        )

        //                <SearchForm params={params} onParamChange={handleParamChange} />
}



