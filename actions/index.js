import { CREATE_ENTRY, START_DAY, UPDATE_MASTERS, UPDATE_DATE, SYNC_SUCCESS, LOADING, UNABLE_CONNECT, DAY_END, VALID_PASSWORD, LOGIN } from '../actionTypes';
import Axios from 'axios';

const SERVER_UI  = 'https://jpent-backend.herokuapp.com'

export function createEntry(entry){
    return{
        type: CREATE_ENTRY,
        payload : entry
    }
}

const initialize_start_day = ()=>{
    return {
        type : START_DAY
    }
}
const sync_failed = ()=>{
    return{
        type: UNABLE_CONNECT
    }
}

const success_sync = ()=>{
    return{
        type: SYNC_SUCCESS
    }
}

const start_loading = ()=>{
    return {
        type: LOADING,
        payload: true,
    }
}

const stop_loading = ()=>{
    return {
        type: LOADING,
        payload: false
    }
}

export const updateMasters = (masters)=>{
    return{
        type : UPDATE_MASTERS,
        payload: masters
    }
}
export const updateToday = (date)=>{
    return { 
        type: UPDATE_DATE,
        payload: date
    }
}

export const startDay = ()=>{
    return async dispatch=>{
        dispatch(initialize_start_day())
        dispatch(start_loading());
        // setTimeout(()=>{},1000);
        try{
            // connect to server 
            const response = await Axios.get(SERVER_UI+'/sync');
            const respData = response.data

            // update current date;
            dispatch(updateToday(respData.date));
            
            if(respData.update){
                // response has been update
                // update masters using action
                dispatch(updateMasters(respData.users));
            }
            dispatch(success_sync())
            dispatch(stop_loading())
        }catch(err){
            // unable to connect to server
            console.log("Unable to connect: ",err );
            dispatch((sync_failed()))
            dispatch(stop_loading())
        }
        dispatch(stop_loading())
    }
}

export const endDay = (entries,date)=>{
    return async (dispatch,getState)=>{
        dispatch(start_loading());
        try{
            const access_token = getState().cred.access_token;
            const response = await Axios.post(SERVER_UI+'/sync',{ date: date, entry: entries, access_token});
            console.log(response.data);
            dispatch({ type: DAY_END })
            
        }catch(err){
            console.log("Error: ",err);
        }
        dispatch(stop_loading());
    }
}

export const loginTo = (username, password)=>{
    return async dispatch=>{
        dispatch(start_loading());
        try{
            const response = await Axios.post(SERVER_UI+'/sign_in', { username, password });
            const tokenPacket = response.data;
            if(tokenPacket['jwt-token']){
                dispatch({ type : LOGIN, payload: { username: username, token: tokenPacket['jwt-token']} })
            }
        }catch(err){
            console.log("Unable to authenticate")
        }
        dispatch(stop_loading());
    }
}