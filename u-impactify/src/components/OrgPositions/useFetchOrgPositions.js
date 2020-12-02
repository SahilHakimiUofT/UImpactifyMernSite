import axios from 'axios';
import { useReducer, useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../Auth";


const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_URL_ORG = 'http://localhost:5000/positions/byorg/';

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, positions:[]}
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, positions: action.payload.positions}
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, positions:[]}
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage }
        default:
            return state
    }

}


export default function useFetchOrgPositions (params, page) {
    const [state, dispatch] = useReducer(reducer, { positions: [], loading: true})

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        let databody = {
            "orgemail": currentUser.email
        }

        console.log('http://localhost:5000/positions/byorg/'+currentUser.email)

        axios.get('http://localhost:5000/positions/byorg/'+currentUser.email, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { positions: res.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return 
            dispatch({ type: ACTIONS.EEROR, payload: { error: e } })
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get('http://localhost:5000/positions/byorg/'+currentUser.email, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } })
        }).catch(e => {
            if (axios.isCancel(e)) return 
            dispatch({ type: ACTIONS.EEROR, payload: { error: e } })
        })


        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])
    
    return {state, dispatch}
}