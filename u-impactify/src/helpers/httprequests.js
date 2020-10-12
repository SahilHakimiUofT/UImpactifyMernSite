import axios from 'axios';
import { SERVER_BASE_ADDRESS } from './constants'

/*
    Example function call: If you want to send a post request to http://localhost:5000/users/add with data
    Call PostRequest('users/add', data)
*/

export function GetRequest(endpoint, config) {
    return axios.get(`${SERVER_BASE_ADDRESS}${endpoint}`, config)
}

export function PostRequest(endpoint, data, config) {
    return axios.post(`${SERVER_BASE_ADDRESS}${endpoint}`, data, config)
}

export function PatchRequest(endpoint, data, config) {
    return axios.patch(`${SERVER_BASE_ADDRESS}${endpoint}`, data, config)
}

export function PutRequest(endpoint, data, config) {
    return axios.put(`${SERVER_BASE_ADDRESS}${endpoint}`, data, config)
}

export function DeleteRequest(endpoint, config) {
    return axios.delete(`${SERVER_BASE_ADDRESS}${endpoint}`, config)
}
