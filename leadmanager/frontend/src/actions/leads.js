import axios from 'axios'
import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS, ADD_MESSAGE, DELETE_MESSAGE } from './types'
import { tokenConfig } from './auth'
//Get data
export const getLeads = () => (dispatch, getState) => {
    axios
        .get("http://127.0.0.1:8000/api/leads/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
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

//Delete data
export const deleteLead = id => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
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
export const addLead = lead => (dispatch, getState) => {
    axios
        .post(`/api/leads/`, lead, tokenConfig(getState))
        .then(res => {
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