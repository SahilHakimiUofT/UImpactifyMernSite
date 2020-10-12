import axios from 'axios';
import { BASE_ADDRESS } from './constants'

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
