import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, GET_ERRORS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types'


//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) =>{
    //USER LOADING
    dispatch({ type: USER_LOADING })
    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: USER_LOADED,
                payload: res.data 
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data,
                    status: err.response.status
                }
            })
            dispatch({
                type: AUTH_ERROR
            })
        })
}


//LOGIN USER
export const login = (username, password) => dispatch =>{
    
    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    //REQUEST BODY
    const body = JSON.stringify({ username, password })

    axios
        .post("/api/auth/login", body, config)
        .then(res =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data 
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data,
                    status: err.response.status
                }
            })
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//LOGOUT USER
export const logout = () => (dispatch, getState) =>{
    axios
        .post("/api/auth/logout", null, tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data,
                    status: err.response.status
                }
            })
        })
}

//REGISTER USER
export const register = ({ username, password, email }) => dispatch =>{
    
    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    //REQUEST BODY
    const body = JSON.stringify({ username, password, email })

    axios
        .post("/api/auth/register", body, config)
        .then(res =>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data 
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data,
                    status: err.response.status
                }
            })
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//SETUP CONFIG WITH TOKEN ~ HELPER FUNCTION
export const tokenConfig = getState =>{
    //GET TOKEN FROM STATE
    const token = getState().auth.token

    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //IF TOKEN, ADD TO HEADERS CONFIG
    if(token){
        config.headers["Authorization"] = `Token ${token}`
    }
    return config
}