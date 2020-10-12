import axios from 'axios';
import { BASE_ADDRESS } from './constants'

/*
    Example function call: If you want to send a post request to http://localhost:5000/users/add with data
    Call PostRequest('users/add', data)
*/

export function GetRequest(endpoint, config) {
    return axios.get(`${BASE_ADDRESS}${endpoint}`, config)
}

export function PostRequest(endpoint, data, config) {
    return axios.post(`${BASE_ADDRESS}${endpoint}`, data, config)
}

export function PatchRequest(endpoint, data, config) {
    return axios.patch(`${BASE_ADDRESS}${endpoint}`, data, config)
}

export function PutRequest(endpoint, data, config) {
    return axios.put(`${BASE_ADDRESS}${endpoint}`, data, config)
}

export function DeleteRequest(endpoint, config) {
    return axios.delete(`${BASE_ADDRESS}${endpoint}`, config)
}
