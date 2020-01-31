import axios from 'axios'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, ADD_MESSAGE, DELETE_MESSAGE } from './types'

//Get data
export const getLeads = () => dispatch => {
    axios
    .get("http://127.0.0.1:8000/api/leads/")
    .then(res =>{
        dispatch({
            type: GET_LEADS,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

//Delete data
export const deleteLead = id => dispatch => {
    axios
    .delete(`/api/leads/${id}/`)
    .then(res =>{
        dispatch({
            type: DELETE_MESSAGE,
            payload: {
                msg: "LEAD DELETED",
                status: res.status
            }
        })
        dispatch({
            type: DELETE_LEAD,
            payload: id
        })
    })
    .catch(err => console.log(err))
}

//Add data
export const addLead = lead => dispatch => {
    axios
    .post(`/api/leads/`, lead)
    .then(res =>{
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                msg: "LEAD ADDED",
                status: res.status
            }
        })
        dispatch({
            type: ADD_LEAD,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: {
                msg: err.response.data,
                status: err.response.status
            }
        })
    })
}