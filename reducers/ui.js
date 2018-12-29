import { SYNC_SUCCESS,START_DAY, LOADING, UPDATE_DATE, UNABLE_CONNECT, DAY_END, LOGIN} from '../actionTypes';

const initialUiState = {
    dayStarted : false,
    sync_started : false,
    sync_completed : false,
    unable_to_connect : false,
    date : new Date(),
    loading: false,
    day_end : false,
    valid_password: false,
}

export const UIReducer = (state = initialUiState, action)=>{
    switch(action.type){
        case SYNC_SUCCESS:
            return {...state, sync_completed: true,sync_started:false}
        case START_DAY:
            return { ...state, sync_started: true, day_started : true, day_end: false}
        case LOADING:
            return {...state, loading: action.payload }
        case UPDATE_DATE:
            return { ...state , date : action.payload}
        case UNABLE_CONNECT:
            return{...state, sync_started:false, sync_completed:false, unable_to_connect: true }
        case DAY_END:
            return {...initialUiState,day_end : true}
        case LOGIN:
            return { ...state, valid_password: true}
        default:
        return state
    }
}