import { LOGIN } from '../actionTypes';
const initialState = {
    access_token : "",
    username : "",
    password : ""
}

export default credReducer = (state = initialState, action)=>{
    switch(action.type){

        case LOGIN: return {...state, username: action.payload.username,access_token: action.payload.token }

        default:
            return state
    }
}
