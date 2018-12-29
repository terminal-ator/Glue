import { UPDATE_MASTERS } from '../actionTypes';

const initialState = {
    1 : {
        id : 1,
        name : 'Mittal Traders',
        route : 'mon'
    },

    2 : {
        id : 2,
        name : 'Om Evergreen Sweets',
        route : 'tue'
    },
    3 : {
        id : 3,
        name : 'Aggarwal Departmental',
        route : 'wed'
    },
    all : [1,2,3]
}

export const accountsReducer = (state = initialState, action)=>{
    switch(action.type){
        case UPDATE_MASTERS:
            return {...state, ...action.payload}
        default:
            return state
    }
}