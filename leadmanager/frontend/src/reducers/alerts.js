import { GET_ERRORS, ADD_MESSAGE, DELETE_MESSAGE } from '../actions/types'


const initialState = {
    msg: {},
    status: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status
            }
        case ADD_MESSAGE:
            return{
                msg: action.payload.msg,
                status: action.payload.status
            }
        case DELETE_MESSAGE:
            return{
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state
    }
}